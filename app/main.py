from fastapi import FastAPI
from services.otp import send_otp



app=FastAPI(title="AI Youtube Assistant",description="FARM Stack and Langchain based AI Assistant where user can chat with AI to get insights inside of an particular youtube video" ,version="1.0.0")




@app.get('/')
def root():
    return {"Message":"Hello World"}



@app.get('/otp')
def otp():
    send_otp("singharyan90827@gmail.com")
    return "OTP had sent"
