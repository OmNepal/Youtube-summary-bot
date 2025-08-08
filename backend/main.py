from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import re

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

  videoId = parseYoutubeURL(url)

  return {"summary": videoId}


def parseYoutubeURL(url):
   pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
   match = re.search(pattern, url)
   
   return match.group(1) if match else None
   