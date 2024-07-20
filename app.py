from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    subject = request.form['subject']
    message = request.form['message']
    
    with open('contacts.txt', 'a') as file:
        file.write(f"Name: {name}\n")
        file.write(f"Email: {email}\n")
        file.write(f"Phone: {phone}\n")
        file.write(f"Subject: {subject}\n")
        file.write(f"Message: {message}\n")
        file.write("\n" + "="*50 + "\n\n")
    
    return 'Form submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
