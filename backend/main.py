from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from controllers.summarize_controller import summarize

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.post("/api/summarize")
async def handleSummarize(req: Request):
  return await summarize(req)


   