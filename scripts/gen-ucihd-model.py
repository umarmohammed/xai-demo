# copied from https://everdark.github.io/k9/notebooks/ml/model_explain/model_explain.nb.html#452_on_tabular_data_classifiers
from lime.lime_tabular import LimeTabularExplainer
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from joblib import dump, load


def build_model():

     ucihd_attr = [
        "age",
        "sex",      # 0 = female 1 = male
        "cp",       # chest pain type 1: typical angina 2: atypical angina 3: non-anginal pain 4: asymptomatic
        # resting blood pressure (in mm Hg on admission to the hospital)
        "trestbps",
        "chol",     # serum cholestoral in mg/dl
        "fbs",      # (fasting blood sugar > 120 mg/dl) (1 = true; 0 = false)
        "restecg",  # resting electrocardiographic results 0: normal 1: having ST-T wave abnormality 2: showing probable or definite left ventricular hypertrophy by Estes' criteria
        "thalach",  # maximum heart rate achieved
        "exang",    # exercise induced angina (1 = yes; 0 = no)
        "oldpeak",  # ST depression induced by exercise relative to rest
        "slope",    # the slope of the peak exercise ST segment
        "ca",       # number of major vessels (0-3) colored by flouroscopy
        "thal",     # 3 = normal; 6 = fixed defect; 7 = reversable defect
        # diagnosis of heart disease (angiographic disease status) 0: < 50% diameter narrowing 1-4: > 50% diameter narrowing
        "label"
    ]

    ucihd_local_path = "../datasets/processed.cleveland.data"

    ucihd = pd.read_csv(ucihd_local_path, header=None,
                        names=ucihd_attr, na_values="?")

    categorical_attr = ["sex", "cp", "fbs", "restecg", "exang", "thal"]
    for col in categorical_attr:
        ucihd[col] = ucihd[col].astype("category")

    # Clean label.
    ucihd.loc[ucihd["label"] > 1, "label"] = 1

    # sklearn's implementation of RF doesn't allow missing value.
    # For categorical (as string) we can leave one special category for missing,
    # but for numerical we need to do some special encoding or imputation.
    ucihd_2 = ucihd.copy()
    ucihd_2.loc[ucihd_2["ca"].isna(), "ca"] = -1  # Encode missing numerical.

    ucihd_2 = pd.get_dummies(ucihd_2, columns=categorical_attr, dummy_na=True)
    ucihd_y = ucihd_2.pop("label")
    train, test, ucihd_y_train, _ = train_test_split(
        ucihd_2, ucihd_y.values, test_size=.3, random_state=64)

    # horrible hack to reverse effect of pd.get_dummies
    _, test_display, _, _ = train_test_split(
        ucihd, ucihd_y.values,  test_size=.3, random_state=64)

    ucihd_rf = RandomForestClassifier(n_estimators=100, random_state=64)
    _ = ucihd_rf.fit(train, ucihd_y_train)

    feature_names = ucihd_2.columns
    class_names = ["Negative", "Positive"]
    caterogical_features = [
        i for i, col in enumerate(feature_names) if "_" in col]
    feature_names_display = ucihd_attr

    return (ucihd_rf, train.values, test, feature_names, class_names, caterogical_features, test_display, feature_names_display)


if __name__ == "__main__":
    dump(build_model(), "../models/processed.cleveland.joblib")
