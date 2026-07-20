from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    model_path: str = "models/house_price.pkl"
    locations_path: str = "models/locations.json"
    cors_origins: str = "http://localhost:5173"
    app_name: str = "House Price Prediction API"


settings = Settings()
