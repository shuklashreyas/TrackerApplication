# models/stats.py
from pydantic import BaseModel
from typing import Optional

class Stats(BaseModel):
    iq: int
    confidence: int
    strength: int
    health: int
    looks: int
    focus: int
    spiritual: int

class SinStats(BaseModel):
    pride: int
    lust: int
    gluttony: int
    greed: int
    sloth: int
    envy: int
    wrath: int

class UserProfile(BaseModel):
    email: str
    stats: Stats
    sins: Optional[SinStats] = None
