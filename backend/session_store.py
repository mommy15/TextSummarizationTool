from flask import session

# this is a simple session store for flask
def store_session(email):
    session['user'] = email
# Remove the user from the session (called during logout)
def remove_session():
    session.pop('user', None)
# Check if the user is currently logged in 
def is_authenticated():
    return 'user' in session
