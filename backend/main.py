from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from utils.getTranscript import getTranscript
from utils.getVideoId import getVideoId

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.post("/api/summarize")
async def summarize(request: Request): #the parameter 'request' here is whats coming in the request body
  data = await request.json()
  url = data.get("url")

  videoId = getVideoId(url)

  transcript = getTranscript(videoId)

  return {"transcript": transcript}



   