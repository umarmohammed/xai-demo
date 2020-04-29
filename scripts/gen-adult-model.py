# copied from https://marcotcr.github.io/lime/tutorials/Tutorial%20-%20continuous%20and%20categorical%20features.html
# note had to install sklearn 0.21.3 because of deprecated OneHotEncoder
import xgboost
import sklearn
import numpy as np
from joblib import dump, load
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from interpret.glassbox import ExplainableBoostingClassifier
from sklearn.linear_model import LogisticRegression


def build_model():
    data_attr = ["Age", "Workclass", "fnlwgt", "Education", "Education-Num", "Marital Status",
                 "Occupation", "Relationship", "Race", "Sex", "Capital Gain", "Capital Loss", "Hours per week", "Country", "Label"]

    data = pd.read_csv("../datasets/adult.data", header=None, delimiter=", ", engine="python",
                       names=data_attr, na_values="?")

    categorical_attr = ["Workclass", "Education", "Marital Status",
                        "Occupation", "Relationship", "Race", "Sex", "Country"]

    for col in categorical_attr:
        data[col] = data[col].astype("category")

    data = data.dropna()

    # TODO use Label Encoder
    data.loc[data["Label"] == "<=50K", "Label"] = 0
    data.loc[data["Label"] != 0, "Label"] = 1

    data2 = data.copy()

    data2 = pd.get_dummies(data2, columns=categorical_attr)
    data_y = data2.pop("Label")
    data_y = data_y.astype('int')
    train, test, data_y_train, _ = train_test_split(
        data2, data_y.values, test_size=.3, random_state=64)

    # horrible hack to reverse effect of pd.get_dummies
    _, test_display, _, _ = train_test_split(
        data, data_y.values, test_size=.3, random_state=64)

    rf = LogisticRegression(solver='lbfgs')
    rf.fit(train, data_y_train)

    feature_names = data2.columns
    class_names = ["<=50k", ">50k"]
    caterogical_features = [
        i for i, col in enumerate(feature_names) if "_" in col]
    feature_names_display = data_attr

    return (rf, train.values, test, feature_names, class_names, caterogical_features, test_display, feature_names_display, None)


if __name__ == "__main__":
    dump(build_model(), "../models/adult.joblib")
