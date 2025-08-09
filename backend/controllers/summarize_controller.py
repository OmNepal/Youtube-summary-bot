from utils.getTranscript import getTranscript
from utils.getVideoId import getVideoId

async def summarize(request): #the parameter 'request' here is whats coming in the request body
  data = await request.json()
  url = data.get("url")

  videoId = getVideoId(url)

  transcript = getTranscript(videoId)

  return {"transcript": transcript}
