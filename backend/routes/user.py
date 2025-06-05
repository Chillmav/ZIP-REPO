from fastapi import UploadFile, Form, File, APIRouter, HTTPException
import json
router = APIRouter()

@router.post("/user")
async def get_user(userInput: str = Form(...), photo: UploadFile = File(...)):
    
    try:
        user_data = json.loads(userInput)
        with open("C:\\Users\\Kubus\\Desktop\\ZIP-REPO\\backend\\photos\\photo.jpg", "wb") as f:
            content = await photo.read()
            f.write(content)
            
            
        return {"userInput": user_data,"filename": "photo.jpg"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching frames: {str(e)}")
        

    
    