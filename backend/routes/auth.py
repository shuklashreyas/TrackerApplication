from fastapi import APIRouter, HTTPException
from app.database import db
from app.schemas import User
from passlib.hash import bcrypt

router = APIRouter()

@router.post("/signup")
async def signup(user: User):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    user_dict = user.dict()
    user_dict["password"] = bcrypt.hash(user.password)
    await db.users.insert_one(user_dict)
    return {"message": "User created"}

@router.post("/login")
async def login(user: User):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": "mock-token"}  # Replace with JWT later
