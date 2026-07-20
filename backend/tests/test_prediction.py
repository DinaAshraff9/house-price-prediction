import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_happy_path(client):
    payload = {
        "location": "mumbai",
        "carpet_area_sqft": 850,
        "floor_num": 3,
        "bathroom": 2,
        "balcony": 1,
        "car_parking": 1,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East",
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_price" in data
    assert isinstance(data["predicted_price"], float)
    assert data["predicted_price"] > 0


def test_predict_invalid_input(client):
    # carpet_area_sqft must be > 0 -> this should fail validation (422)
    payload = {
        "location": "mumbai",
        "carpet_area_sqft": -10,
        "floor_num": 3,
        "bathroom": 2,
        "balcony": 1,
        "car_parking": 1,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East",
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422
