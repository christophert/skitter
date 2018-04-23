# skitter
[![Build Status](https://travis-ci.org/christophert/skitter.svg?branch=master)](https://travis-ci.org/christophert/skitter)

Detailed documentation can be found on the [Skitter wiki](https://github.com/christophert/skitter/wiki)

**Note:** For this project to work  you must have your virual memory set to 262144 for elasticsearch, and your operating system must support volumes
`sysctl -w vm.max_map_count=262144`

## Table of Contents
* [Development & Testing](#development--testing)
  * [Prerequsites](#prerequsites)
* [Contributing](#contributing)
* [Endpoints](#endpoints)
* [License](#license)

## Development & Testing
C
All development is currently done on the develop branch. Once ready for release, the develop branch is merged into master with built & minified CSS & JS and tagged at the new version.
### Prerequsites
To commence development, you will require the following:
* Docker 17.12.0-ce+
* docker-compose 1.19.0+

## Unimplemented Features:

* UI - Skit replies (the backend is implemented)
* All Unit tests - some unit tests were included, but not all of them, additionaly the selenium test was not created due to lack of time
* UI - dashboard timeline with everyone (backend implemented)

## Endpoints

We have thuroughly secured a good deal of our enpoints. Each are actually sitting on their own docker instances,
but are being proxied for our application through one entrypoint for simplicity and security. All endpoints are secured with a dynamic CA server that generates all keys and certificates for each server individually.  This happens on startup of each service.

### J2EE

Authorization API


`GET /auth/isAuthenticated`

returns the account model if they are authenticated


`POST /auth/register`

**requires authorization, verified by proxy server**

expects: application/json

example body: `{ "email":"jfb3657@rit.edu","firstName":"Joe","lastName":"Bartelmo" }`


`PUT /auth/account`

**requires authorization, verified by proxy server**

expects: application/json

example body: `{ "email":"jfb3657@rit.edu","firstName":"Joe","lastName":"Bartelmo" }`

`GET /auth/accounts`

**requires authorization, verified by proxy server**

returns all accounts


### NodeJS

Skits API


`GET /skits/GetSkits`

**requires authorization, verified by proxy server**

Expects: Query parameter `id` which is the user id on the ldap server

Example: `/skits/GetSkits?id=jfb3657`

returns all skits associated with the given user


`POST /skits/AddSkit`
**requires authorization, verified by proxy server**

Expects: application/json

example body: `{ "msg" : "this is a test" }`

(uses headers to determine the uid and full name of the person, these headers are generated by the proxy server and are not seen by the client), if the client attempts an attack they will be overriden.


`DELETE /skits/RemoveSkit`
**requires authorization, verified by proxy server**
Expects: Query parameter `skitId` which is the `_id` of the skit document in the elasticsearch cluster
Example: `/skits/RemoveSkit?skitId=1028eh-129hjdfAD`

### Flask

Follower API

`GET /follows/GetFollowers`

**requires authorization, verified by proxy server**

Expects: Query parameter `uid` which is the uid of the person's followers you want to view

returns a list of followers

example: `/follows/GetFollowers?uid=jfb3657`


`GET /follows/UserSearch`

**requires authorization, verified by proxy server**

Expects: Query parameter `uid` which is approximately the user id of your target

example: `/follows/UserSearch?uid=jfb` (finds jfb3657)


`POST /follows/FollowUser`

**requires authorization, verified by proxy server**

Expects: application/json

body example: `{"follow": "ctt1414"}`


`DELETE /follows/UnfollowUser`

**requires authorization, verified by proxy server**

Expects: Query parameter `follow` which is the uid of the person you want to unfollow


### Ruby on Rails

Skit-Reply API

`POST /skitreply/AddSkitReply`

**requires authorization, verified by proxy server**

expects: application/json

example body: `{"skitId": "923brkhjbf09823", "reply": "Hi mom!!", "otherUid": "ctt1414"}`

_Note: otherUid is the uid of the skit owner_

(uses headers to determine the uid and full name of the person, these headers are generated by the proxy server and are not seen by the client), if the client attempts an attack they will be overriden.

returns an individual skit and it's associated replies


`GET /skitreply/GetSkitReply`


**requires authorization, verified by proxy server**
Expects: Query parameter `skitId` which is the `_id` of the skit document in the elasticsearch cluster; Query Parameter `uid` which is the uid of the skit owner; 

returns a json body of the skit replies associated with this  skit


####  Note: Add/Remove was the name of this activity, however there was no description of the Remove endpoint so it was not implemented.



## Contributing
We are not currently accepting contributions at this time.

## License
The Skitter source is provided under the MIT License.
