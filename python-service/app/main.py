from fastapi import FastAPI
from pydantic import BaseModel

from app.classifier import classify_complaint


app = FastAPI(
    title="SmartServiceX AI Service",
    description="Complaint classification and priority service",
    version="1.0.0"
)


class ComplaintRequest(BaseModel):
    title: str
    description: str


@app.get("/")
def root():
    return {
        "message": "SmartServiceX AI Service is running"
    }


@app.post("/api/classify")
def classify(request: ComplaintRequest):

    result = classify_complaint(
        request.title,
        request.description
    )

    return {
        "title": request.title,
        "description": request.description,
        **result
    }