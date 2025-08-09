from utils.getTranscript import getTranscript
from utils.getVideoId import getVideoId

#python library to load env variables
from dotenv import load_dotenv
import os


from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")


# Initialize OpenAI LLM with a temperature of 0.9 for randomness
llm = OpenAI(temperature=0.9, openai_api_key=api_key)

async def summarize(request): 
  data = await request.json()
  url = data.get("url")

  videoId = getVideoId(url)

  transcript = getTranscript(videoId)

  prompt = "Given the transcript of a youtube video, summarize the youtube video. Transcript: {transcript}"

  prompt_template = PromptTemplate.from_template(prompt)

  chain = prompt_template | llm

  result = chain.invoke(transcript)



  return {"summary": result}
