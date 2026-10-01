from fastapi import FastAPI

app = FastAPI(
    title="2-Back Experiment API",
    description="Backend for the 2-Back experiment",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "2-Back Experiment Backend is running"
    }