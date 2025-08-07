from youtube_transcript_api import YouTubeTranscriptApi

ytt_api = YouTubeTranscriptApi()
fetched_transcript = ytt_api.fetch('ZzI9JE0i6Lc')


transcript = ''
for snippet in fetched_transcript:
  transcript += snippet.text + ' '

print(transcript)