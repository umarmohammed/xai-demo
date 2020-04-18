from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app)


def dataPointToDictionary(dataPoint, feature_names):
    dpDict = {}
    for i in range(len(feature_names)):
        dpDict[feature_names[i]] = dataPoint[i]

    return dpDict


def trainToDictArray(train, feature_names):
    dictArray = []
    for dataPoint in train:
        dictArray.append(dataPointToDictionary(dataPoint, feature_names))
    return dictArray


@app.route("/api/upload", methods=['POST'])
def upload_model():
    # this would usually persist
    file = request.files['file']
    model, train, test, feature_names, class_names, categorical_features, test_display, feature_names_display = load(
        file.stream)

    return jsonify(dict(items=trainToDictArray(test_display.values.tolist(), feature_names_display), featureNames=feature_names_display))
