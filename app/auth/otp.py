from email.message import EmailMessage
import os
from dotenv import load_dotenv
from smtplib import SMTP
import secrets


load_dotenv()

def send_otp(user_email:str):
    msg=EmailMessage()
    msg['From']=os.getenv("EMAIL")
    msg['To']=user_email
    msg['Subject']='OTP Verification'
    msg.set_content(f'Your OTP is {"".join(str(secrets.randbelow(10)) for i in range(6))}')


    with SMTP(host='smtp.gmail.com',port=587) as smtp:
        smtp.starttls()
        smtp.login(os.getenv("EMAIL"),os.getenv("PSWD"))
        smtp.send_message(msg)


