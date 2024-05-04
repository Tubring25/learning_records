import requests
from dotenv import dotenv_values

config = dotenv_values(".env")

url = 'https://burn.hair/v1/chat/completions'


def generate_blog(paragraph_topic):
  x = requests.post(
    url,
    headers={
      'Authorization': 'Bearer ' + config['API_KEY']
    },
    json={
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'user',
          'content': 'Write a paragraph about the following topic. ' + paragraph_topic,
        }
      ],
      'temperature': 0.7
    }
  )
  choices = x.json()['choices']
  return choices[0]['message']['content']

keepWriting = True

while keepWriting:
  answer = input('Write a paragraph? Y for yes, anything else for no: ')
  if answer == 'Y':
    topic = input('What is the topic? ')
    print(generate_blog(topic))
  else:
    keepWriting = False

