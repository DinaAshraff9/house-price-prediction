import logging

import joblib
import numpy as np
import pandas as pd

from app.core.config import settings

logger = logging.getLogger(__name__)

_model = None


def load_model() -> None:
    """Load the trained pipeline once. Call this at app startup, not per-request."""
    global _model
    logger.info("Loading model from %s", settings.model_path)
    _model = joblib.load(settings.model_path)
    logger.info("Model loaded successfully")


def get_model():
    if _model is None:
        raise RuntimeError("Model is not loaded yet. Did startup run?")
    return _model


def predict_price(df: pd.DataFrame) -> float:
    model = get_model()
    prediction = model.predict(df)
    return float(np.expm1(prediction[0]))
