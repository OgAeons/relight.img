from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image
from io import BytesIO

from app.model import relight_image

app = FastAPI()

@app.post("/relight")
async def relight(file: UploadFile = File(...)):
    image_bytes = await file.read()
    input_image = Image.open(BytesIO(image_bytes)).convert("RGB")
    
    output_image = relight_image(input_image)

    buf = BytesIO()
    output_image.save(buf, format="PNG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")