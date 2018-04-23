"""
Activity 8 - Flask Follow/Unfollow
"""
from json import dumps
from flask import Flask, request, abort
from flaskext.mysql import MySQL

APP = Flask(__name__)
MYSQL = MySQL()
APP.config['MYSQL_DATABASE_USER'] = 'skitter_overlord'
APP.config['MYSQL_DATABASE_PASSWORD'] = 'a_GENerIC_p@ssW0rd'
APP.config['MYSQL_DATABASE_DB'] = 'skitter'
APP.config['MYSQL_DATABASE_HOST'] = 'db'
MYSQL.init_app(APP)

def query_db(query, args=(), one=False, stringify=True):
    """
    Performs a query against a database and then returns the result as json
    :arg query sql query
    :arg args argumnets to inject into query
    :arg whether or not we're expecting one result
    :arg stringify whether or not to return as string
    :return json dump of sql result
    """
    cur = DB.cursor()
    cur.execute(query, args)
    rows = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.close()
    dictionary = (rows[0] if rows else None) if one else rows
    if stringify:
        return dumps(dictionary)
    return dictionary

@APP.route('/follows/GetFollowers')
def get_folowers():
    """
    Grabs all followers for a given user id (request.args.get(uid))
    :return json dump of followers
    """
    if 'X-XSRF-TOKEN' not in request.headers:
        abort(403, 'No CSRF')
        return ""
    if 'X-SKITTER-AUTH-USER' not in request.headers:
        abort(400, 'No Skitter Header assigned')
        return ""
    user = request.args.get('uid')
    if user is None or len(user) <= 0:
        return "[]"
    return query_db("SELECT following FROM follower WHERE user_id=%s", (user,))

@APP.route('/follows/UserSearch')
def get_users():
    """
    Does a quick query against the user database to find a specific
    user id (request.args.get(uid))
    :return json dump of account objects
    """
    if 'X-XSRF-TOKEN' not in request.headers:
        abort(403, 'No CSRF')
        return ""
    if 'X-SKITTER-AUTH-USER' not in request.headers:
        abort(400, 'No Skitter Header assigned')
        return ""
    user = request.args.get('uid')
    if user is None or len(user) <= 0:
        return query_db("SELECT * FROM account;")
    return query_db("SELECT * FROM account WHERE uid LIKE %s;",\
            ("%" + user + "%",))

@APP.route('/follows/FollowUser', methods=['POST'])
def follow_user():
    """
    Adds a followed user to the database table if able
    """
    data = request.get_json()
    if data is None or 'follow' not in data:
        abort(400, 'Requires json form: {follow: \'\'}')
        return ""
    user = request.headers['X-SKITTER-AUTH-USER']
    if user is None or 'X-XSRF-TOKEN' not in request.headers:
        abort(400, 'No Skitter Header assigned')
        return ""
    follow = data['follow']

    if len(query_db("SELECT * FROM account WHERE uid=%s", \
            (user,), stringify=False)) != 1:
        abort(418, 'Given UID is not a valid user')
        return ""
    if len(query_db("SELECT * FROM account WHERE uid=%s", \
            (follow,), stringify=False)) != 1:
        abort(418, 'Given UID for follower is not a valid user')
        return ""
    if len(query_db('SELECT * FROM follower WHERE user_id=%s ' + \
            'AND following=%s;', (user, follow), stringify=False)) == 1:
        abort(418, 'Already following user')
        return ""

    query_db('INSERT INTO follower VALUES (%s, %s);', (user, follow))
    return query_db('SELECT * FROM follower WHERE user_id=%s ' + \
            'AND following=%s;', (user, follow), one=True)

@APP.route('/follows/UnfollowUser', methods=['DELETE'])
def unfollow_user():
    """
    Adds a followed user to the database table if able
    """
    if 'X-XSRF-TOKEN' not in request.headers:
        abort(403, 'No CSRF')
        return ""
    user = request.headers['X-SKITTER-AUTH-USER']
    if user is None:
        abort(400, 'No Skitter Header assigned')
        return ""
    follow = request.args.get('follow')
    if user is None or follow is None:
        abort(400, 'Requires follow as query parameters')
        return ""

    if len(query_db('SELECT * FROM follower WHERE user_id=%s ' + \
            'AND following=%s;', (user, follow), stringify=False)) != 1:
        abort(418, 'Not following user')
        return ""

    query_db('DELETE FROM follower WHERE user_id=%s AND following=%s;', \
            (user, follow))
    return ""

if __name__ == '__main__':
    DB = MYSQL.connect()
    query_db("""
        CREATE TABLE IF NOT EXISTS follower (
            user_id varchar(255) NOT NULL,
            following varchar(255) NOT NULL,
            PRIMARY KEY(user_id, following),
            INDEX(user_id, following)
        );
    """)
    APP.run(host='0.0.0.0', port=1337, debug=False)
