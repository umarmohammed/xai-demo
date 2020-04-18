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


def explain(idx, model, train, test, feature_names, class_names, categorical_features):
    ucihd_rf_explainer = LimeTabularExplainer(
        train, class_names=["Negative", "Positive"],
        feature_names=feature_names,
        categorical_features=categorical_features)

    # We take one true positive and one false positive for examples.
    exp = ucihd_rf_explainer.explain_instance(
        test.iloc[idx], model.predict_proba, num_features=4)

    return exp.as_list()


@app.route("/api/lime/<id>", methods=["Post"])
def lime(id):
    file = request.files['file']

    model, train, test, feature_names, class_names, categorical_features, _, _ = load(
        file.stream)

    return jsonify(explain(int(id), model, train, test, feature_names, class_names, categorical_features))
