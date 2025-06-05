from fastapi import UploadFile, Form, File, APIRouter, HTTPException
import json
from model.bin.fit_frames_prediction import main
from db import frames_collection
router = APIRouter()


async def transform_data(frames_collection, user_data):
    from index import fix_id
    raw_frames = await frames_collection.find().to_list(length=None)
    frames = [fix_id(frame) for frame in raw_frames]

    
    user_data = {
        "colors": user_data[2]["Color"],
        "maxPrice": 1000 / user_data[2]["Price"],
        "marks": user_data[2]["Mark"],
        "stars_color": 2 * user_data[3]["Color"],
        "stars_price": 2 * user_data[3]["Price"],
        "stars_brand": 2 * user_data[3]["Mark"],
        "ai_impact": user_data[2]["AI"] / 100,
        "type": user_data[2]["Type"],
        "shape": user_data[2]["Shape"]
    }

    return user_data, frames


@router.post("/user")
async def get_user(userInput: str = Form(...), photo: UploadFile = File(...)):
    
    try:

        user_data = json.loads(userInput)
        print(user_data)
        with open("/home/chillmaw/Projects/ZIP-REPO/backend/photos/photo.jpg", "wb") as f:
            content = await photo.read()
            f.write(content)

        user_data, frames = await transform_data(frames_collection, user_data)
        recommendation = main("/home/chillmaw/Projects/ZIP-REPO/backend/photos/photo.jpg", user_data, frames)

        return {"recommendation": recommendation}
    
    except Exception as e:

        raise HTTPException(status_code=500, detail=f"Error fetching frames: {str(e)}")
        

    
    