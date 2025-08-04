from google.generativeai import GenerativeModel, list_models
import google.generativeai as genai

genai.configure(api_key="AIzaSyCrSlSPVyz708-vkqHaM_rmGEwTKTJBmQ4")

models = list_models()
for model in models:
    print(model.name)
