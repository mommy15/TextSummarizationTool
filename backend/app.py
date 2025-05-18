from flask import Flask, request, jsonify, session
from flask_cors import CORS
from summarizer import summarize_text
from auth import authenticate_user
from session_store import store_session, remove_session, is_authenticated
from auth import register_user


app = Flask(__name__)
app.secret_key = 'secret_key'  # This should be more secure in production.
CORS(app, origins="http://localhost:3000",  supports_credentials=True)

# Route to check if the server is running
@app.route('/', methods=['GET'])
def home():
    return "Server is up and running"

# Login route to authenticate and store session
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if authenticate_user(email, password):
        store_session(email)
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Logout route to remove session
@app.route('/logout', methods=['POST'])
def logout():
    remove_session()
    return jsonify({"message": "Logged out successfully"}), 200

# Summarize route to generate the summary of the provided text
@app.route('/summarize', methods=['POST'])
def summarize():
    if not is_authenticated():
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json
    text = data.get('text')
    ratio = float(data.get('ratio', 0.3))

    if not text:
        return jsonify({"summary": "", "error": "No text provided"}), 400

    # If ratio is invalid, set it to a default value
    if ratio <= 0 or ratio > 1:
        return jsonify({"summary": "", "error": "Invalid ratio value. It should be between 0 and 1."}), 400

    summary = summarize_text(text, ratio)
    return jsonify({"summary": summary})

# Register route to create a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if register_user(email, password):
        return jsonify({"message": "Registration successful"}), 201
    else:
        return jsonify({"message": "User already exists"}), 409

@app.route('/status', methods=['GET'])
def status():
    if 'user' in session:
        return jsonify({'loggedIn': True, 'user': session['user']})
    else:
        return jsonify({'loggedIn': False})

if __name__ == '__main__':
    app.run(debug=True)

