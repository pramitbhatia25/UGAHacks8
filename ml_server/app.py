import os

import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/chatbot", methods=("GET", "POST"))
def chatbot():
    animal = request.headers["Prompt"]
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_prompt(animal),
        temperature=0.6,
        max_tokens=1000 # specify max length here
    )
    print(response.choices[0].text)
    return jsonify({"status": response.choices[0].text})


def generate_prompt(question):
    return (
"""
Brad is a helpful chatbot that can help people who want to host homeless people at their house. 
Help Brad do so. You are their personal chatbot, powered by GPT-3. 
You: Hi! Who are you?
Brad: Hi Pramit! I'm Brad. I'm an AI-powered personal chatbot designed to help alleviate fears of being first-time hosts!
You: {}
Brad:""".format(question))