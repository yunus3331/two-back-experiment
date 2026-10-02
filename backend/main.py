from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, func
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import random

from database import Base, engine, get_db, SessionLocal


app = FastAPI()


app.add_middleware( CORSMiddleware, allow_origins=[ "http://localhost:5500", "http://127.0.0.1:5500" ], allow_credentials=True, allow_methods=["*"], allow_headers=["*"], )

FEEDBACK_TYPES = [
    "negative_destructive",
    "negative_supportive",
    "positive_destructive",
    "positive_supportive"
]

class ExperimentResult(Base):
    __tablename__ = "experiment_results"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, nullable=False)
    stage1_score = Column(Integer, nullable=False)
    stage2_score = Column(Integer, nullable=False)
    feedback_type = Column(String, nullable=False)


class FeedbackCounter(Base):
    __tablename__ = "feedback_counters"

    id = Column(Integer, primary_key=True, index=True)

    feedback_type = Column(String, unique=True, nullable=False)

    count = Column(Integer, nullable=False, default=0)


Base.metadata.create_all(bind=engine)


def initialize_feedback_counters():
    db = SessionLocal()

    try:
        for feedback_type in FEEDBACK_TYPES:
            existing = (
                db.query(FeedbackCounter)
                .filter(
                    FeedbackCounter.feedback_type == feedback_type
                )
                .first()
            )

            if existing is None:
                db.add(
                    FeedbackCounter(
                        feedback_type=feedback_type,
                        count=0
                    )
                )

        db.commit()

    finally:
        db.close()


initialize_feedback_counters()




class ExperimentResultCreate(BaseModel):
    student_id: str
    stage1_score: int
    stage2_score: int
    feedback_type: str





@app.get("/")
def root():
    return {
        "message": "Backend is running"
    }


@app.get("/feedback/next")
def get_next_feedback(
    db: Session = Depends(get_db)
):

    feedback_counters = db.query(FeedbackCounter).all()

    min_count = min(
        counter.count
        for counter in feedback_counters
    )

    least_used = [
        counter
        for counter in feedback_counters
        if counter.count == min_count
    ]

    selected_counter = random.choice(least_used)

    selected_counter.count += 1

    db.commit()

    return {
        "feedback_type": selected_counter.feedback_type,
        "count": selected_counter.count
    }


@app.post("/results")
def create_result(
    result: ExperimentResultCreate,
    db: Session = Depends(get_db)
):

    db_result = ExperimentResult(
        student_id=result.student_id,
        stage1_score=result.stage1_score,
        stage2_score=result.stage2_score,
        feedback_type=result.feedback_type
    )

    db.add(db_result)

    db.commit()

    db.refresh(db_result)

    return {
        "message": "Result saved successfully",
        "id": db_result.id
    }


@app.post("/results/bulk")
def create_results(
    results: list[ExperimentResultCreate],
    db: Session = Depends(get_db)
):

    db_results = [
        ExperimentResult(
            student_id=result.student_id,
            stage1_score=result.stage1_score,
            stage2_score=result.stage2_score,
            feedback_type=result.feedback_type
        )
        for result in results
    ]

    db.add_all(db_results)

    db.commit()

    return {
        "message": "Results saved successfully",
        "count": len(db_results)
    }


@app.get("/results")
def get_results(
    db: Session = Depends(get_db)
):

    results = db.query(ExperimentResult).all()

    return [
        {
            "id": result.id,
            "student_id": result.student_id,
            "stage1_score": result.stage1_score,
            "stage2_score": result.stage2_score,
            "feedback_type": result.feedback_type
        }
        for result in results
    ]

