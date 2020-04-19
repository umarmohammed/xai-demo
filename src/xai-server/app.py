from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from lime.lime_tabular import LimeTabularExplainer

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
    _, _, _, _, _, _, test_display, feature_names_display = load(
        file.stream)

    return jsonify(dict(items=trainToDictArray(test_display.values.tolist(), feature_names_display), featureNames=feature_names_display))


def getPredictProbabilities(probArray, class_names):
    predictProbabilites = []
    for i in range(len(class_names)):
        predictProbabilites.append(
            {"name": class_names[i], "value": probArray[i]})
    return predictProbabilites


def explain(idx, model, train, test, feature_names, class_names, categorical_features):
    ucihd_rf_explainer = LimeTabularExplainer(
        train, class_names=class_names,
        feature_names=feature_names,
        categorical_features=categorical_features)

    # We take one true positive and one false positive for examples.
    exp = ucihd_rf_explainer.explain_instance(
        test.iloc[idx], model.predict_proba, num_features=4)

    probArray = model.predict_proba(
        test.iloc[idx].values.reshape(1, -1)).flatten().tolist()

    print(class_names)
    return dict(exp=exp.as_list(), predictProbabilities=getPredictProbabilities(probArray, class_names))


@app.route("/api/lime/<id>", methods=["Post"])
def lime(id):
    file = request.files['file']

    model, train, test, feature_names, class_names, categorical_features, _, _ = load(
        file.stream)

    return jsonify(explain(int(id), model, train, test, feature_names, class_names, categorical_features))
