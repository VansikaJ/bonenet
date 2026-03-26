from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI(title="BoneNet API", version="1.0")

# Allow your React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup — not on every request
print("Loading BoneNetV2 model...")
model = tf.keras.models.load_model("model/BONE NET V2.keras")
print("Model ready.")

CLASSES = [
    "Avulsion fracture",
    "Comminuted fracture",
    "Fracture Dislocation",
    "Greenstick fracture",
    "Hairline Fracture",
    "Impacted fracture",
    "Longitudinal fracture",
    "Oblique fracture",
    "Pathological fracture",
    "Spiral Fracture",
]

def preprocess(image_bytes: bytes) -> np.ndarray:
    """Convert raw image bytes → model-ready tensor."""
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((256, 256))
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)   # shape: (1, 256, 256, 3)


@app.get("/")
def root():
    return {"status": "BoneNet API is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Only JPEG and PNG images are supported.")

    image_bytes = await file.read()

    try:
        tensor = preprocess(image_bytes)
    except Exception:
        raise HTTPException(status_code=422, detail="Could not process image. Ensure it's a valid X-ray image.")

    predictions = model.predict(tensor, verbose=0)[0]   # shape: (10,)
    class_index = int(np.argmax(predictions))
    confidence = float(predictions[class_index])

    # Return top prediction + all class probabilities
    return {
        "fracture_type": CLASSES[class_index],
        "confidence": round(confidence * 100, 2),
        "all_probabilities": {
            CLASSES[i]: round(float(predictions[i]) * 100, 2)
            for i in range(len(CLASSES))
        },
    }