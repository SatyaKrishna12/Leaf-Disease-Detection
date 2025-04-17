from flask import Flask, request, jsonify # type: ignore
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np # type: ignore
import io
from PIL import Image # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

# Load model
model = load_model("Aug_plant_model_best.keras")

# Class labels
class_labels = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper__bell___Bacterial_spot", "Pepper__bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight", "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites_Two_spotted_spider_mite", "Tomato__Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus", "Tomato__Tomato_mosaic_virus", "Tomato_healthy"
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img = img.resize((224, 224))   # Rescale to [0, 1]
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0) 

        prediction = model.predict(img_array)
        predicted_index = np.argmax(prediction[0])
        predicted_label = class_labels[predicted_index]
        confidence_score = float(prediction[0][predicted_index])

        return jsonify({
        "predicted_class": str(predicted_label),
        "confidence_score": round(confidence_score, 2)  # confidence as percentage
        })


    except Exception as e:
        print(" Error during prediction:", e)
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=False)

