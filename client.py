import requests
import json

url = 'http://localhost:8080'
s = requests.Session()

# unauthenticated

r = s.get('{}/authn'.format(url))
print(r.text)

r = s.post('{}/authn'.format(url), 
    data = json.dumps({
        'username': 'administrator',
        'password': 'wrongpassword' 
    }), headers = {
        'Content-Type': 'application/json'
    })
print(r.text)

# authenticated

r = s.post('{}/authn'.format(url), 
    data = json.dumps({
        'username': 'administrator',
        'password': '123456' 
    }), headers = {
        'Content-Type': 'application/json'
    })
print(r.text)

r = s.get('{}/authn'.format(url))
print(r.text)