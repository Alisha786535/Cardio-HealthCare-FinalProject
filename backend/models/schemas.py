from pydantic import BaseModel
from typing import Optional, List

class UserProfile(BaseModel):
    name: str
    age: int
    gender: str
    weight: float
    height: float
    blood_pressure_systolic: int
    blood_pressure_diastolic: int
    cholesterol: int
    smoking_status: str
    activity_level: str
    sleep_hours: float
    family_history: bool
    conditions: List[str] = []

class RiskRequest(BaseModel):
    age: int
    gender: str
    blood_pressure_systolic: int
    blood_pressure_diastolic: int
    cholesterol: int
    smoking_status: str
    activity_level: str
    sleep_hours: float
    family_history: bool
    bmi: float
    conditions: List[str] = []

class RiskResponse(BaseModel):
    risk_score: int
    risk_level: str
    explanation: str
    top_risk_factors: List[str]
    recommendations: List[str]

class ProfileResponse(BaseModel):
    message: str
    profile: UserProfile
