from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image
from io import BytesIO

from app.model import relight_image

app = FastAPI()

@app.post("/relight")
async def relight(file: UploadFile = File(...)):
    try:
        print("Reading uploaded file...")
        image_bytes = await file.read()
        input_image = Image.open(BytesIO(image_bytes)).convert("RGB")
        
        print("Relighting image...")
        output_image = relight_image(input_image)

        print("Saving to buffer...")
        buf = BytesIO()
        output_image.save(buf, format="JPEG")
        buf.seek(0)

        print("Returning image response.")
        return StreamingResponse(buf, media_type="image/jpeg")

    except Exception as e:
        print("error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))