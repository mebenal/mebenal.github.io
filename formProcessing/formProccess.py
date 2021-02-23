from flask import Flask, render_template, request

app = Flask(__name__)
formData = {"name":'',"email":''}
@app.route('/', methods=['GET', 'POST'])
def form():
    return render_template('form.html')

#@app.route('/hello', methods=['GET', 'POST'])
#def hello():
#    return render_template('greeting.html', say=request.form['user_name'], to=request.form['user_mail'])
@app.route('/hello', methods=['GET', 'POST'])
def hello():
    formData['name']=request.form['user_name']
    formData['email']=request.form['user_mail']
    print('Name: '+formData["name"]+'\nEmail: '+formData['email'])
    return render_template('form.html', say=request.form['user_name'], to=request.form['user_mail'])

if __name__ == "__main__":
    app.run()



