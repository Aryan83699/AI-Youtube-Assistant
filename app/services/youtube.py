from youtube_transcript_api import YouTubeTranscriptApi,TranscriptsDisabled

def has_transcript(video_id:str):
    try:
        api=YouTubeTranscriptApi()
        transcript_list=api.list(video_id)
        thumbnail_url = (f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg")
        languages=[transcript.language for transcript in transcript_list]
        return {'thumbnail':thumbnail_url,"languages":languages}
    except TranscriptsDisabled:
        raise("No transcription available")
    except Exception as e:
        raise(f"An error occured {e}")