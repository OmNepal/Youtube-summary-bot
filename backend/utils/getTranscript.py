from youtube_transcript_api import YouTubeTranscriptApi

def getTranscript(videoId):
  ytt_api = YouTubeTranscriptApi()
  fetched_transcript = ytt_api.fetch(videoId)

  transcript = ''
  for snippet in fetched_transcript:
    transcript += snippet.text + " "

  return transcript

