from pymongo import AsyncMongoClient
from fastapi import Request
from dotenv import load_dotenv
import os
from datetime import timezone , datetime
import asyncio

load_dotenv()


# async def get_database(request:Request):
#     # client = AsyncMongoClient(os.getenv("MONGODB_URL"))
#         yield request.app.state.mongo_client["ai_youtube"]


async def get_database(request: Request):
    client = request.app.state.mongo_client
    yield client["ai_youtube"]
