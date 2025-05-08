# app/routes/auth.py
from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin
from app.database import db
from passlib.context import CryptContext

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/signup")
async def signup(user: UserCreate):
    user_in_db = await db.users.find_one({"email": user.email})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password

    await db.users.insert_one(user_dict)
    return {"message": "User created successfully"}

@router.post("/login")
async def login(user: UserLogin):
    user_in_db = await db.users.find_one({"email": user.email})
    if not user_in_db or not pwd_context.verify(user.password, user_in_db["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "email": user.email}

@router.get("/list-users")
async def list_users():
    users = await db["users"].find({}, {"_id": 0, "username": 1, "email": 1}).to_list(length=100)
    return users
