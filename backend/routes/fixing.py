from fastapi import UploadFile, Form, File, APIRouter, HTTPException
from model.bin.fit_frames_prediction import get_recommendation, visualize_detected_points, visualize_landmarks
from typing import Optional
import json
import asyncio

router = APIRouter()



@router.post("/fixing")
async def control_ai(photo: UploadFile = File(...)):

    photo_path = "/home/chillmaw/Projects/ZIP-REPO/backend/photos/photo.jpg"

    with open(photo_path, "wb") as f:
        content = await photo.read()
        f.write(content)

    visualize_landmarks(photo_path)
    visualize_detected_points(photo_path)
    eye_spacing, face_shape, brows_shape = get_recommendation(photo_path)


    return eye_spacing, face_shape, brows_shape



