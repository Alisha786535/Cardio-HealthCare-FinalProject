from fastapi import APIRouter
from models.schemas import UserProfile, ProfileResponse

router = APIRouter()

# In-memory store for now (no DB yet)
_profile_store = {}

@router.post("/save", response_model=ProfileResponse)
def save_profile(profile: UserProfile):
    _profile_store["user"] = profile
    return ProfileResponse(message="Profile saved successfully", profile=profile)

@router.get("/get")
def get_profile():
    if "user" not in _profile_store:
        return {"message": "No profile found. Please save your profile first."}
    return _profile_store["user"]
