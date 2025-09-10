import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Render.com-kompatible Datenbankkonfiguration
if os.environ.get('RENDER'):
    # Für Render.com: In-Memory oder temporäre Datei
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/data.db'
else:
    # Für lokale Entwicklung
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Importiere Models nach db-Definition
from src.models.content import Content
from src.models.user import User

# Importiere Routes
from src.routes.content import content_bp
from src.routes.user import user_bp

app.register_blueprint(content_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')

@app.route('/')
def home():
    return {"message": "Real Estate Innovation Engine API is running!"}

@app.route('/health')
def health():
    return {"status": "healthy", "database": "connected"}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
