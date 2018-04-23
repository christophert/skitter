import requests
xheaders={"X-SKITTER-AUTH-USER": "jfb3657", \
         "X-SKITTER-AUTH-NAME": "Joe Bartelmo", \
         "content-type": "application/json", \
         "X-XSRF-TOKEN": "dummytoken"}

# assumes jfb3657 and ctt1414 are in the db

print('Testing add follower no data..')
r = requests.post("https://localhost/follows/FollowUser", headers=xheaders, data={})
assert r.status_code >= 400

print('Testing add follower no headers..')
r = requests.post("https://localhost/follows/FollowUser", data={"follow": "ctt1414"})
assert r.status_code >= 400

print('Testing add follower success..')
r = requests.post("https://localhost/follows/FollowUser", headers=xheaders, data={"follow": "ctt1414"})
assert r.status_code >= 200 and r.status_code <= 315

print('Get Followers..')
r = requests.post("https://localhost/follows/GetFollowers?uid=jfb3657", headers=xheaders)
assert r.status_code >= 200 and r.status_code <= 315

print('Get Userssearch..')
r = requests.post("https://localhost/follows/UserSearch?uid=jfb", headers=xheaders)
assert r.status_code >= 200 and r.status_code <= 315