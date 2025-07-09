from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

# Load static knowledge base
with open("./data/faq.json", encoding="utf-8") as f:
    faq_data = json.load(f)

# define request model
class QuestionRequest(BaseModel):
    question: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend running with JSON lookup (no AI yet)."}

@app.post("/ask")
async def ask(payload: QuestionRequest):
    question = payload.question.strip().lower()

    for item in faq_data:
        if item["question"].strip().lower() == question:
            return {"answer": item["answer"]}
        
    return {"answer": "Sorry, I do not know the answer to that yet."}
