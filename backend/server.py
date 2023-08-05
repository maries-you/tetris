import html
import json

import pymongo
from pymongo import MongoClient
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from marshmallow import Schema, fields, ValidationError, validate

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)
db = client['tetris']
records_collection = db['records']


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
    records = list(
        records_collection
            .find({}, {'_id': 0})
            .sort('score', pymongo.DESCENDING)
            .limit(10)
    )
    for record in records:
        record['username'] = html.escape(record['username'])
    records_data = json.dumps(records, ensure_ascii=False)
    return Response(records_data, content_type='application/json')


@app.route('/records', methods=['POST'])
def add_record():
    try:
        validated_record = RecordSchema().load(request.json)
    except ValidationError:
        return 'error', 400
    records_collection.insert_one(validated_record)
    return 'success'


if __name__ == '__main__':
    app.run('0.0.0.0')