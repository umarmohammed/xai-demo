from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from lime.lime_tabular import LimeTabularExplainer
from lime.lime_text import LimeTextExplainer

app = Flask(__name__)
CORS(app)


def dataPointToDictionary(dataPoint, feature_names, predicted):
    dpDict = {}
    for i in range(len(feature_names)):
        dpDict[feature_names[i]] = dataPoint[i]
        dpDict["predicted"] = predicted

    return dpDict


def testToDictArray(test, feature_names, predicted):
    dictArray = []
    for i in range(len(test)):
        dictArray.append(dataPointToDictionary(
            test[i], feature_names, predicted[i]))
    return dictArray


@app.route("/api/upload", methods=['POST'])
def upload_model():
    # this would usually persist
    file = request.files['file']
    model, _, test, _, _, _, test_display, feature_names_display, _ = load(
        file.stream)

    predicted = model.predict(test)

    return jsonify(dict(items=testToDictArray(test_display.values.tolist(), feature_names_display, predicted.tolist()), featureNames=feature_names_display))


def getPredictProbabilities(probArray, class_names):
    predictProbabilites = []
    for i in range(len(class_names)):
        predictProbabilites.append(
            {"name": class_names[i], "value": probArray[i]})
    return predictProbabilites


def getFeatures(exp):
    features = []
    for pair in exp:
        features.append(pair[0])
    return features


def featureIsBoolenEq1(feature):
    return "=1" in feature


def featureIsBoolenEq0(feature):
    return "=0" in feature


def getFeatureValue(feature, value):
    if featureIsBoolenEq1(feature):
        return bool(value)
    elif featureIsBoolenEq0(feature):
        return not bool(value)
    else:
        return value


def getFeatureValues(dataPoint, exp, expMap):
    feature_values = []
    features = getFeatures(exp)
    for i in range(len(features)):
        feature_values.append(
            {"feature": features[i], "value": getFeatureValue(features[i], dataPoint[expMap[i][0]]), "class": 1 if expMap[i][1] > 0 else 0})
    return feature_values


def explain(idx, model, train, test, feature_names, class_names, categorical_features):
    ucihd_rf_explainer = LimeTabularExplainer(
        train, class_names=class_names,
        feature_names=feature_names,
        categorical_features=categorical_features)

    exp = ucihd_rf_explainer.explain_instance(
        test.iloc[idx], model.predict_proba, num_features=4)

    probArray = model.predict_proba(
        test.iloc[idx].values.reshape(1, -1)).flatten().tolist()

    return dict(exp=exp.as_list(), predictProbabilities=getPredictProbabilities(probArray, class_names), featureValues=getFeatureValues(test.iloc[idx], exp.as_list(), exp.as_map()[1]))


@app.route("/api/lime/<id>", methods=["Post"])
def lime(id):
    file = request.files['file']

    model, train, test, feature_names, class_names, categorical_features, _, _, _ = load(
        file.stream)

    return jsonify(explain(int(id), model, train, test, feature_names, class_names, categorical_features))


def limeTextExplain(data, model, class_names):
    explainer = LimeTextExplainer(class_names=class_names)
    exp = explainer.explain_instance(
        data, model.predict_proba, num_features=6)

    probArray = model.predict_proba([data])

    return dict(exp=exp.as_list(), predictProbabilities=getPredictProbabilities([probArray[0][0], probArray[0][1]], class_names))


@app.route("/api/lime-text", methods=["Post"])
def limeText():
    file = request.files['file']
    (model, class_names) = load(file.stream)
    dataPoint = request.form['data']
    return limeTextExplain(dataPoint, model, class_names)


@app.route("/api/global/feature-info", methods=["Post"])
def globalInfo():
    file = request.files['file']

    model = load(file.stream)[-1]

    exp = model.explain_global()

    return jsonify(exp.selector.to_dict('records'))


@app.route("/api/global/feature-importance", methods=["POST"])
def globalImportance():
    file = request.files['file']
    model = load(file.stream)[-1]
    exp = model.explain_global()
    return exp.visualize().to_json()


def getFid(exp, feature):
    if feature:
        return exp.selector.Name.tolist().index(feature)
    else:
        return 0


@app.route("/api/global/feature-shaping/<feature>", methods=["POST"])
def featureShaping(feature):
    file = request.files['file']
    model = load(file.stream)[-1]
    exp = model.explain_global()

    fid = getFid(exp, feature)
    return exp.visualize(fid).to_json()
