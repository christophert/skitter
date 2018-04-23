import requests
xheaders={"X-SKITTER-AUTH-USER": "testuser", \
         "X-SKITTER-AUTH-NAME": "Test User", \
         "content-type": "application/json", \
         "X-XSRF-TOKEN": "dummytoken"}
addskit = {}
print('Testing add skit no data..')
r = requests.post("https://localhost/skits/AddSkit", headers=xheaders, data={})
assert r.status_code >= 400

print('Testing add skit no headers..')
r = requests.post("https://localhost/skits/AddSkit", data={})
assert r.status_code >= 400

print('Testing valid skit')
skit = requests.post("https://localhost/skits/AddSkit", headers=xheaders, data={"msg":"this is a test"})
assert skit.status_code >= 200 and skit.status_code <= 315

print('Testing skit retrieve')
r = requests.get("https://localhost/skits/GetSkits?id=testuser", headers=xheaders)
assert r.status_code >= 200 and r.status_code <= 315
