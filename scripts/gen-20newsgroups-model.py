from sklearn.datasets import fetch_20newsgroups
import sklearn
from joblib import dump, load
from sklearn.pipeline import make_pipeline
import sklearn.ensemble
import json


def data_to_dict_array(data, target, target_label):
    output = []
    for i in range(len(data)):
        output.append({"value": data[i], "target": target_label[target[i]]})
    return output


def build_model():
    categories = ['alt.atheism', 'soc.religion.christian']
    newsgroups_train = fetch_20newsgroups(
        subset='train', categories=categories)
    data = newsgroups_train.data
    target = newsgroups_train.target
    class_names = ['atheism', 'christian']
    vectorizer = sklearn.feature_extraction.text.TfidfVectorizer(
        lowercase=False)
    train_vectors = vectorizer.fit_transform(newsgroups_train.data)
    rf = sklearn.ensemble.RandomForestClassifier(n_estimators=100)
    rf.fit(train_vectors, newsgroups_train.target)
    return {"data": json.dumps(data_to_dict_array(
        data, target, newsgroups_train.target_names)), "model": (rf, class_names)}


if __name__ == "__main__":
    newsgroups = build_model()
    dump(newsgroups["model"], '../models/20newsgroups.joblib')
    f = open("../datasets/20newsgroups.json", "w")
    f.write(newsgroups["data"])
    f.close()
