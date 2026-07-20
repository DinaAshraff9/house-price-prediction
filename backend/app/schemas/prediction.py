from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    location: str = Field(..., description="Location name, e.g. 'mumbai'. Unknown locations are mapped to 'other'.")
    carpet_area_sqft: float = Field(..., gt=0, description="Carpet area in square feet, must be > 0")
    floor_num: int = Field(..., description="Floor number (0 = Ground, -1 = Basement)")
    bathroom: int = Field(..., ge=0, description="Number of bathrooms")
    balcony: int = Field(..., ge=0, description="Number of balconies")
    car_parking: int = Field(0, ge=0, description="Number of car parking spots")
    furnishing: str = Field(..., description="'Furnished' | 'Semi-Furnished' | 'Unfurnished'")
    transaction: str = Field(..., description="'New Property' | 'Resale'")
    ownership: str = Field(..., description="Ownership type, e.g. 'Freehold'")
    facing: str = Field(..., description="Facing direction, e.g. 'East'")

    class Config:
        json_schema_extra = {
            "example": {
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
        }


class PredictionResponse(BaseModel):
    predicted_price: float
