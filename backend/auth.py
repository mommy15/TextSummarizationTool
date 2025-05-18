import csv
import os

# Define the path to the CSV file
# This will be the path to the CSV file where user data is stored
USER_FILE = os.path.join(os.path.dirname(__file__), "users.csv")

# Ensure users.csv exists
if not os.path.exists(USER_FILE):
    with open(USER_FILE, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["email", "password"])
        # Add headers to the CSV file
        writer.writeheader()  

# Function to check if a user is authenticated with email and password

def authenticate_user(email, password):
    with open(USER_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["email"] == email and row["password"] == password:
                return True
    return False

# Function to register a new user
def register_user(email, password):
    # First Check if the user already exists
    with open(USER_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["email"] == email:
                # user already exists
                return False 

    # Register new user using DictWriter
    with open(USER_FILE, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["email", "password"])
        writer.writerow({"email": email, "password": password})
    return True

