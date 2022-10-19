from flask import Flask, render_template, request
import requests
import smtplib
from environs import Env

env = Env()
env.read_env()

posts = requests.get(env.str('url')).json()
app = Flask(__name__)

OWN_EMAIL = env.str('OWN_EMAIL')  # Receivers gmail address
OWN_PASSWORD = env.str('OWN_PASSWORD')  # Google App password NOT gmail password


@app.route("/")
def hello_world():
    return render_template('index.html', all_posts=posts)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact', methods=['POST', "GET"])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']
        send_email(name, email, phone, message)
        return render_template("contact.html", msg_sent=True)
    return render_template('contact.html', msg_sent=False)


@app.route('/post/<int:post_id>')
def show_post(post_id):
    for post in posts:
        if post['id'] == post_id:
            post_body = post['body']
            post_image = post['background']
            post_title = post['title']
            post_subtitle = post['subtitle']
            return render_template('post.html', p_body=post_body, p_image=post_image, p_title=post_title,
                                   p_sub=post_subtitle)


def send_email(name, email, phone, message):
    '''In order to use SMPTLIB, you have to give permission to receivers gmail, acception external mails. FOr this turn on TWO STEP VERIFICATION on accaunt settings and create new app. user given 16 char app`s password as host email`s password'''
    email_message = f"Subject:New Message\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nMessage:{message}"
    with smtplib.SMTP("smtp.gmail.com", port=587) as connection:
        connection.starttls()
        connection.login(OWN_EMAIL, OWN_PASSWORD)
        connection.sendmail(from_addr=email,
                            to_addrs=OWN_EMAIL,
                            msg=email_message)


if __name__ == "__main__":
    app.run(debug=True)
