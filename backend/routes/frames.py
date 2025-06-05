from fastapi import APIRouter, HTTPException
from db import frames_collection
router = APIRouter()

@router.get("/frames")

async def get_frames():
    try:
        
        framesData = {
            "Shape": await frames_collection.distinct("shape"),
            "Color": await frames_collection.distinct("color"),
            "Type": await frames_collection.distinct("type"),
            "Mark": await frames_collection.distinct("mark")
        }
        
        return framesData
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching frames: {str(e)}")
        