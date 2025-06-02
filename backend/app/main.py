from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.responses import StreamingResponse
from PIL import Image
from io import BytesIO
from app.model import relight_image
import asyncio

app = FastAPI()

@app.post("/relight")
async def relight(request: Request, file: UploadFile = File(...)):
    try:
        print("Reading uploaded file...")
        image_bytes = await file.read()
        input_image = Image.open(BytesIO(image_bytes)).convert("RGB")
        
        print("Relighting image...")
        # You can wrap the model call in asyncio to periodically check disconnect
        async def run_with_disconnect_check():
            # Split into async chunks if possible (not always easy with blocking model code)
            await asyncio.sleep(0.1)  # simulate small delay
            if await request.is_disconnected():
                print("Client disconnected during processing.")
                raise HTTPException(status_code=499, detail="Client disconnected")
            
            # Run the heavy model code (you may consider offloading this to a separate thread)
            return relight_image(input_image)
        
        output_image = await run_with_disconnect_check()

        print("Saving to buffer...")
        buf = BytesIO()
        output_image.save(buf, format="JPEG")
        buf.seek(0)

        print("Returning image response.")
        return StreamingResponse(buf, media_type="image/jpeg")

    except HTTPException as e:
        raise e
    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))