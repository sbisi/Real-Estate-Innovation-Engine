from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dummy-Daten für Testing
DEMO_CONTENTS = [
    {
        "id": 1,
        "title": "Smart Building IoT Integration",
        "short_description": "Internet of Things sensors for intelligent building management.",
        "content_type": "technology",
        "industry": "Real Estate",
        "time_horizon": "short",
        "creator_username": "tech_expert",
        "created_at": "2024-01-15T10:00:00Z",
        "average_rating": 4.2,
        "rating_count": 15,
        "comment_count": 8
    }
]

@app.route('/')
def home():
    return {"message": "Real Estate Innovation Engine API is running!"}

@app.route('/api/contents')
def get_contents():
    return jsonify(DEMO_CONTENTS)

@app.route('/health')
def health():
    return {"status": "healthy", "mode": "demo"}

if __name__ == '__main__':
    app.run(debug=True)
