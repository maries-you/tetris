import json
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

DATABASE_PATH = 'database.json'


@cross_origin
@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/records', methods=['GET'])
def get_records():
    with open(DATABASE_PATH, 'r', encoding='utf8') as read_file:
        records = json.load(read_file)
    records_data = json.dumps(records, ensure_ascii=False)
    return Response(records_data, content_type='application/json')


@app.route('/records', methods=['POST'])
def add_record():
    with open(DATABASE_PATH, 'r', encoding='utf8') as read_file:
        records = json.load(read_file)
    print(request.json)
    records.append(request.json)
    with open(DATABASE_PATH, 'w', encoding='utf8') as write_file:
        json.dump(records, write_file, indent=4, ensure_ascii=False)
    return 'success'


if __name__ == '__main__':
    app.run('0.0.0.0')