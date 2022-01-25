import json
import requests
from contextlib import redirect_stdout

f = open('common.json')
f2 = open('dictionary.json')

data = json.load(f)
dictionary = json.load(f2)

not_word = []
for i,word in enumerate(data):
    print(i,word)
    if len(word) == 5:
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        response = response.json()
        try:
            x = response[0]['meanings'][0]['definitions'][0]['definition']
        except:
            not_word.append(word)
    else:
        data.remove(word)
        
# for word in data[:100]:
#     if word in dictionary.keys():
#         print(word)


        
for word in not_word:
    data.remove(word)

with open('words_5.txt', 'w') as f:
    with redirect_stdout(f):
        print(data)