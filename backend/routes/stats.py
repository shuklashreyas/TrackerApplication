# routes/stats.py
from fastapi import APIRouter, HTTPException
from models.stats import UserProfile
from database import user_collection

router = APIRouter()

@router.post("/save-stats")
async def save_stats(profile: UserProfile):
    existing = await user_collection.find_one({"email": profile.email})
    if existing:
        await user_collection.update_one(
            {"email": profile.email},
            {"$set": {
                "stats": profile.stats.dict(),
                "sins": profile.sins.dict() if profile.sins else {}
            }}
        )
    else:
        await user_collection.insert_one(profile.dict())
    return {"message": "Stats saved successfully"}
