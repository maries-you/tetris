import json
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from marshmallow import Schema, fields, ValidationError, validate

app = Flask(__name__)
CORS(app)

DATABASE_PATH = 'database.json'


class RecordSchema(Schema):
    username = fields.String(required=True)
    score = fields.Integer(required=True, validate=validate.Range(min=1))
    complexity = fields.Integer(required=True, validate=validate.Range(min=1, max=19))


@cross_origin
@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/records', methods=['GET'])
def get_records():
    with open(DATABASE_PATH, 'r', encoding='utf8') as read_file:
        records = json.load(read_file)
    records = sorted(records, key=lambda d: d['score'], reverse=True)
    records_data = json.dumps(records[:10], ensure_ascii=False)
    return Response(records_data, content_type='application/json')


@app.route('/records', methods=['POST'])
def add_record():
    with open(DATABASE_PATH, 'r', encoding='utf8') as read_file:
        records = json.load(read_file)
    try:
        validated_record = RecordSchema().load(request.json)
    except ValidationError:
        return 'error', 400
    records.append(validated_record)
    with open(DATABASE_PATH, 'w', encoding='utf8') as write_file:
        json.dump(records, write_file, indent=4, ensure_ascii=False)
    return 'success'


if __name__ == '__main__':
    app.run('0.0.0.0')