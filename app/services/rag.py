from langchain.chat_models import init_chat_model
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel,RunnablePassthrough,RunnableLambda,RunnableSequence
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch  
from youtube_transcript_api import YouTubeTranscriptApi,TranscriptsDisabled
from fastapi import Request
from urllib.parse import urlparse, parse_qs

load_dotenv()

#initializing model
model=init_chat_model(model='openai/gpt-oss-20b',model_provider='groq')

#initializing prompts
prompt=PromptTemplate(
    template="""
        You are helpful assistant.Answer only from the provided transcript contet. If the context is insufficient , use your some external knowledge too but dont hallucinate and connect it with the video context window
        {context} Question: {question}
    """, input_variables=['context','question'])


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)



client = Request.app.state.mongo_client
collection=client['ai_youtube']['rag_embeddings']

#vector search
vector_store = MongoDBAtlasVectorSearch(
    collection=collection,
    embedding=embeddings,
    index_name="youtube_vector_index",
    text_key="text",
    embedding_key="embeddings"
)


#retriever
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)

#parser
parser=StrOutputParser()

def format_doc(retrieved_docs):
    context_text='\n\n'.join(doc.page_content for doc in retrieved_docs)
    return context_text



def model_invoke(url: str,question:str):
    parsed = urlparse(url)

    if parsed.hostname in ("youtube.com", "www.youtube.com", "m.youtube.com"):
        video_id= parse_qs(parsed.query).get("v", [None])[0]

    elif parsed.hostname == "youtu.be":
        video_id= parsed.path.lstrip("/").split("/")[0] or None

    else:
        return "Invalid URL"

    try:
        fetched_transcript=YouTubeTranscriptApi().fetch(video_id=video_id,languages=['en'])
        # print(fetched_transcript)
        transcript_list=fetched_transcript.to_raw_data()
        # print(transcript_list)
        transcript=''.join(chunk['text'] for chunk in transcript_list)
        # print(transcript)
    except TranscriptsDisabled:
        return "No captions avaialble for this "
    except Exception as e:
        return f"An error occured {e}"


    parallel_chain=RunnableParallel({
        'context':retriever | RunnableLambda(format_doc),
        'question':RunnablePassthrough()
    })

    main_chain=RunnableSequence(parallel_chain,prompt,model,parser)

    return model.invoke(question)