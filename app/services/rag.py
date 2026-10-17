# from langchain.chat_models import init_chat_model
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from dotenv import load_dotenv
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnableParallel,RunnablePassthrough,RunnableLambda,RunnableSequence
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_mongodb import MongoDBAtlasVectorSearch  
# from youtube_transcript_api import YouTubeTranscriptApi,TranscriptsDisabled
# from fastapi import Request,HTTPException
# from urllib.parse import urlparse, parse_qs

# load_dotenv(dotenv_path="app/.env")

# #initializing model
# model=init_chat_model(model='openai/gpt-oss-20b',model_provider='groq')

# #initializing prompts
# prompt=PromptTemplate(
#     template="""
#         You are helpful assistant.Answer only from the provided transcript contet. If the context is insufficient , use your some external knowledge too but dont hallucinate and connect it with the video context window
#         {context} Question: {question}
#     """, input_variables=['context','question'])


# embeddings = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )


# request=Request
# client = request.app.state.mongo_client
# collection=client['ai_youtube']['rag_embeddings']

# #vector search
# vector_store = MongoDBAtlasVectorSearch(
#     collection=collection,
#     embedding=embeddings,
#     index_name="youtube_vector_index",
#     text_key="text",
#     embedding_key="embeddings"
# )


# #retriever
# retriever = vector_store.as_retriever(
#     search_type="similarity",
#     search_kwargs={"k": 5}
# )

# #parser
# parser=StrOutputParser()

# def format_doc(retrieved_docs):
#     context_text='\n\n'.join(doc.page_content for doc in retrieved_docs)
#     return context_text

# def add_data(collection,chunks):
#     collection.insert_many([{"text":chunk,'embeddings':embeddings.embed_query(chunk)} for chunk in chunks]) 



# def model_invoke(video_id: str):
#     try:
#         fetched_transcript=YouTubeTranscriptApi().fetch(video_id=video_id,languages=['en'])
#         # print(fetched_transcript)
#         transcript_list=fetched_transcript.to_raw_data()
#         # print(transcript_list)
#         transcript=''.join(chunk['text'] for chunk in transcript_list)
#         # print(transcript)
#     except TranscriptsDisabled:
#         raise HTTPException(status_code=404,detail="No captions avaialble for this ") 
#     except Exception as e:
#         return f"An error occured {e}"

#     splitter=RecursiveCharacterTextSplitter(chunk_size=100,chunk_overlap=20)
#     chunks=splitter.split_text(transcript)
#     collection.insert_many([{"text":chunk,'embeddings':embeddings.embed_query(chunk)} for chunk in chunks])




# def model_ans(question:str):
#     parallel_chain=RunnableParallel({
#         'context':retriever | RunnableLambda(format_doc),
#         'question':RunnablePassthrough()
#     })

#     main_chain=RunnableSequence(parallel_chain,prompt,model,parser)

#     return model.invoke(question)




import os

from dotenv import load_dotenv
from fastapi import HTTPException
from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
)

from langchain.chat_models import init_chat_model
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import (
    RunnableLambda,
    RunnablePassthrough,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch


# Load environment variables before initializing the model.
load_dotenv(dotenv_path="app/.env")

model = init_chat_model(
    model="openai/gpt-oss-20b",
    model_provider="groq",
    temperature=0,
)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

prompt = PromptTemplate(template="""
You are an assistant that answers questions about a YouTube video.

Answer using only the provided transcript context.
If the transcript does not contain enough information, clearly
say that the answer cannot be determined from the transcript.
Do not invent facts.

Transcript context:
{context}

Question:
{question}

Answer:
"""
,input_variables=['context','question'])

parser = StrOutputParser()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=10,
)


def get_vector_store(collection):
    """Create a vector store using the supplied synchronous collection."""
    return MongoDBAtlasVectorSearch(
        collection=collection,
        embedding=embeddings,
        index_name="youtube_vector_index",
        text_key="text",
        embedding_key="embeddings",
    )


def process_video(video_id: str, collection) -> int:
    """Fetch a video's English transcript and store its chunks."""

    try:
        transcript_data = YouTubeTranscriptApi().fetch(
            video_id,
            languages=["en"],
        )

        transcript = " ".join(
            item["text"] for item in transcript_data.to_raw_data()
        )

    except TranscriptsDisabled as exc:
        raise HTTPException(
            status_code=404,
            detail="Transcripts are disabled for this video.",
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Could not fetch the transcript: {str(exc)}",
        ) from exc

    if not transcript.strip():
        raise HTTPException(
            status_code=404,
            detail="The transcript is empty.",
        )

    # Avoid storing duplicate chunks when the same video is processed again.
    collection.delete_many({"video_id": video_id})

    chunks = splitter.split_text(transcript)

    documents = [
        Document(
            page_content=chunk,
            metadata={"video_id": video_id},
        )
        for chunk in chunks
    ]

    vector_store = get_vector_store(collection)
    vector_store.add_documents(documents)

    return len(documents)


def answer_question(
    question: str,
    video_id: str,
    collection,
) -> str:
    """Retrieve relevant chunks from this video and generate an answer."""

    if not question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    vector_store = get_vector_store(collection)

    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={
            "k": 5,
            "pre_filter": {
                "video_id": {"$eq": video_id}
            },
        },
    )

    def format_docs(documents):
        return "\n\n".join(
            document.page_content for document in documents
        )

    rag_chain = (
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        }
        | prompt
        | model
        | parser
    )

    return rag_chain.invoke(question)
