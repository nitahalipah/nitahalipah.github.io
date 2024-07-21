from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

def load_messages():
    if os.path.exists('messages.txt'):
        with open('messages.txt', 'r') as file:
            lines = file.readlines()
            messages = []
            for line in lines:
                try:
                    name, email, phone, subject, message = line.strip().split(', ')
                    messages.append({
                        'name': name.split(': ')[1],
                        'email': email.split(': ')[1],
                        'phone': phone.split(': ')[1],
                        'subject': subject.split(': ')[1],
                        'message': message.split(': ')[1]
                    })
                except ValueError:
                    pass
            return messages
    return []

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
    
    # Simpan data ke file
    with open('messages.txt', 'a') as file:
        file.write(f"Name: {name}, Email: {email}, Phone: {phone}, Subject: {subject}, Message: {message}\n")
    
    # Arahkan ke halaman messages
    return redirect(url_for('messages'))


@app.route('/messages')
def messages():
    messages = load_messages()
    return render_template('messages.html', messages=messages)



@app.route('/edit/<int:index>', methods=['GET', 'POST'])
def edit(index):
    messages = load_messages()
    if index < 1 or index > len(messages):
        return redirect(url_for('messages'))
    
    if request.method == 'POST':
        updated_message = {
            'name': request.form['name'],
            'email': request.form['email'],
            'phone': request.form['phone'],
            'subject': request.form['subject'],
            'message': request.form['message']
        }
        
        messages[index - 1] = updated_message
        
        with open('messages.txt', 'w') as file:
            for msg in messages:
                file.write(f"Name: {msg['name']}, Email: {msg['email']}, Phone: {msg['phone']}, Subject: {msg['subject']}, Message: {msg['message']}\n")
        
        return redirect(url_for('messages'))
    
    return render_template('edit.html', message=messages[index - 1], index=index)

@app.route('/delete/<int:index>')
def delete(index):
    messages = load_messages()
    if index < 1 or index > len(messages):
        return redirect(url_for('messages'))
    
    messages.pop(index - 1)
    
    with open('messages.txt', 'w') as file:
        for msg in messages:
            file.write(f"Name: {msg['name']}, Email: {msg['email']}, Phone: {msg['phone']}, Subject: {msg['subject']}, Message: {msg['message']}\n")
    
    return redirect(url_for('messages'))

if __name__ == '__main__':
    app.run(debug=True)