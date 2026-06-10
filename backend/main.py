from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.health import router as health_router
from routes.profile import router as profile_router
from routes.risk import router as risk_router

load_dotenv()

app = FastAPI(
    title="CardioAI API",
    description="AI-powered Cardiac Health Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/health",  tags=["Health Check"])
app.include_router(profile_router, prefix="/profile", tags=["User Profile"])
app.include_router(risk_router,    prefix="/risk",    tags=["Risk Assessment"])

@app.get("/")
def root():
    return {"message": "CardioAI API is running", "status": "ok"}
