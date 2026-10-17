
from youtube_transcript_api import (YouTubeTranscriptApi,TranscriptsDisabled)
from fastapi import HTTPException
import os
from dotenv import load_dotenv
import httpx


load_dotenv()

def has_transcript(video_id: str):
    try:
        api = YouTubeTranscriptApi()
        transcript_list = api.list(video_id)

        thumbnail_url = (
            f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
        )

        languages = [
            transcript.language
            for transcript in transcript_list
        ]

        return {
            "id": video_id,
            "thumbnail": thumbnail_url,
            "languages": languages
        }

    except TranscriptsDisabled:
        raise HTTPException(
            status_code=404,
            detail="Transcripts are disabled for this video"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )


async def get_video_data(video_id:str):
    url = "https://www.googleapis.com/youtube/v3/videos"

    params = {
        "part": "snippet,statistics,contentDetails",
        "id": video_id,
        "key": os.getenv("YOUTUBE_API")
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="Failed to fetch YouTube video details"
        )

    items = response.json().get("items", [])

    if not items:
        raise HTTPException(status_code=404, detail="Video not found")

    video = items[0]

    return {
        "title": video["snippet"]["title"],
        "description": video["snippet"]["description"],
        "upload_date": video["snippet"]["publishedAt"],
        "channel": video["snippet"]["channelTitle"],
        "likes": video.get("statistics", {}).get("likeCount"),
        "views": video.get("statistics", {}).get("viewCount")
    }