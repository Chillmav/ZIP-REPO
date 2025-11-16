from fastapi import APIRouter, HTTPException, Request
from model.fit_frames_prediction import main
from db import frames_collection
import json


router = APIRouter()

async def transform_data(frames_collection, user_data):
    
    from index import fix_id
    
    raw_frames = await frames_collection.find().to_list(length=None)
    frames = [fix_id(frame) for frame in raw_frames]

    # rules_face_brows = {('round', 'heart'): ['owalne','okrągłe'], ('round', 'oblong'): ['owalne'], ('round', 'oval'): ['owalne','okrągłe'], ('round', 'round'): ['geometryczne','motyle'], ('round', 'square'): ['okrągłe','owalne'],
    #                     ('high_arch', 'heart'): ['kocie','browline'], ('high_arch', 'oblong'): ['motyle'], ('high_arch', 'oval'): ['motyle','kocie','geometryczne'], ('high_arch', 'round'): ['kocie'], ('high_arch', 'square'): ['browline','owalne'],
    #                     ('straight', 'heart'): ['pilotki','browline','navigator'], ('straight', 'oblong'): ['prostokątne','pilotki'], ('straight', 'oval'): ['pilotki','browline','prostokątne','kwadratowe','geometryczne','navigator'], ('straight', 'round'): ['prostokątne','geometryczne','kwadratowe','navigator'], ('straight', 'square'): ['browline','owalne']}

    # rules_eye_spacing = {'narrow': ['metal','patentka'], 'wide': ['plastik'], 'balanced': ['metal','plastik','żyłka']}

    rules_face = {
                'round': ['prostokątne', "kwadratowe", "geometryczne", "kocie", "wąskie", "browline"],
                  "oval": ["prostokątne", "kwadratowe", "geometryczne", "kocie", "browline", "motyle", "navigator", "okrągłe"],
                  "square": ["okrągłe", "owalne", "motyle", "kocie", "browline", "kształty_specjalne"],
                  "heart": ["kocie", "navigator", "motyle", "owalne"],
                  "oblong": ["browline", "motyle", "okrągłe", "owalne", "kocie", "geometryczne"]
                  }
    
    rules_brows = {
                "straight": ["kwadratowe", "prostokątne", "browline"],
                   "high_arch": ["kocie", "motyle", "owalne", "browline"],
                   "round": ["okrągłe", "owalne", "motyle", "wąskie"]
                   }
    
    rules_eye = {
                "narrow": [("żyłka", 5), ("metal", 4), ("patentka", 3), ("plastik", 2)],
                 "balanced": [("plastik", 5), ("metal", 5), ("patentka", 4), ("żyłka", 4)],
                 "wide": [("plastik", 5), ("patentka", 4), ("metal", 3), ("żyłka", 2)],
                 }
    
    brows_shape = user_data[2][2]
    face_shape = user_data[2][1]
    eye_spacing = user_data[2][0]
    
    recommended_shapes_face = rules_face[face_shape]
    recommended_shapes_brows = rules_brows[brows_shape]
    recommended_types = rules_eye[eye_spacing]

    combined_shapes = {}
    
    for shape in set(recommended_shapes_face + recommended_shapes_brows):
        
        bonus = 1.0
        if shape in recommended_shapes_face and shape in recommended_shapes_brows:
            bonus += 0.5
            
        combined_shapes[shape] = bonus    
        
    
    user_data = {
        
        "colors": user_data[0]["Color"],
        "marks": user_data[0]["Mark"],
        "stars_color": 2 * user_data[1]["Color"],
        "stars_brand": 2 * user_data[1]["Mark"],
        "ai_impact": user_data[0]["AI"] / 100,
        "type": user_data[0]["Type"],
        "shape": user_data[0]["Shape"],
        "ai_shape": combined_shapes,
        "ai_type": recommended_types,
        
    }

    return user_data, frames


@router.post("/user")

async def get_user(request: Request):
    try:

        user_data = await request.json()

        user_data, frames = await transform_data(frames_collection, user_data)
        
        recommendation = main(user_data, frames)

        return {"recommendation": recommendation}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

        

    
    