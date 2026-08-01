import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

df =pd.read_csv('./data/training_data.csv')

X = df.drop("is_suspicious", axis=1)
y = df['is_suspicious']

X_train , X_test , y_train, y_test = train_test_split(X , y , test_size=0.2 , random_state=42 ,stratify=y )


model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train , y_train)

#y_predictions

y_pred =model.predict(X_test)

print(y_pred)
print(classification_report(y_test , y_pred))


feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print(feature_importance.head(10))

joblib.dump(model, "./models/aml_model.pkl")