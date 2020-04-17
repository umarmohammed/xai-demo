# copied from https://marcotcr.github.io/lime/tutorials/Tutorial%20-%20continuous%20and%20categorical%20features.html
# note had to install sklearn 0.21.3 because of deprecated OneHotEncoder
import xgboost
import sklearn
import numpy as np
from joblib import dump, load


def build_model():
    feature_names = ["Age", "Workclass", "fnlwgt", "Education", "Education-Num", "Marital Status",
                     "Occupation", "Relationship", "Race", "Sex", "Capital Gain", "Capital Loss", "Hours per week", "Country"]
    data = np.genfromtxt("C:/dev/xai-demo/datasets/adult.data",
                         delimiter=', ', dtype=str)

    labels = data[:, 14]
    le = sklearn.preprocessing.LabelEncoder()
    le.fit(labels)
    labels = le.transform(labels)
    class_names = le.classes_
    data = data[:, :-1]
    categorical_features = [1, 3, 5, 6, 7, 8, 9, 13]

    categorical_names = {}
    for feature in categorical_features:
        le = sklearn.preprocessing.LabelEncoder()
        le.fit(data[:, feature])
        data[:, feature] = le.transform(data[:, feature])
        categorical_names[feature] = le.classes_

    data = data.astype(float)

    encoder = sklearn.preprocessing.OneHotEncoder(
        categorical_features=categorical_features)

    np.random.seed(1)
    train, test, labels_train, _ = sklearn.model_selection.train_test_split(
        data, labels, train_size=0.80)

    encoder.fit(data)
    encoded_train = encoder.transform(train)

    gbtree = xgboost.XGBClassifier(n_estimators=300, max_depth=5)
    gbtree.fit(encoded_train, labels_train)

    return (gbtree, encoder, train, test, feature_names, class_names, categorical_features,
            categorical_names)


if __name__ == "__main__":
    dump(build_model(), "../models/adult.joblib")
