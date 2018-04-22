FROM fnndsc/ubuntu-python3

RUN apt-get update && apt-get install libmysqlclient-dev -y
RUN python --version
RUN pip3 install flask flask-mysql configparser flask-security flask-sqlalchemy

COPY app.py ./
ENTRYPOINT ["python", "./app.py"]
