import { useLocation, useNavigate } from "react-router-dom";
import type { PredictionRequest } from "../types/prediction";

interface ResultState {
  price: number;
  input: PredictionRequest;
}

function formatIndianPrice(price: number): string {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹ ${(price / 100000).toFixed(2)} Lac`;
  }
  return `₹ ${price.toLocaleString("en-IN")}`;
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  if (!state) {
    return (
      <div className="page">
        <header className="site-header">
          <div className="brand">
            <span className="brand-mark">HP</span>
            <span className="brand-name">House Price Estimator</span>
          </div>
        </header>
        <div className="not-found-card card">
          <p className="eyebrow">No data</p>
          <h1>No prediction data found</h1>
          <p>Please fill in the form first to get a price estimate.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  const { price, input } = state;

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">HP</span>
          <span className="brand-name">House Price Estimator</span>
        </div>
      </header>

      <div className="result-wrap">
        <div className="card result-card">
          <p className="eyebrow">Estimated value</p>
          <p className="price">{formatIndianPrice(price)}</p>
          <p className="price-label">Based on comparable properties and the details you provided</p>

          <div className="divider" />

          <h2>Property summary</h2>
          <dl className="summary-grid">
            <div>
              <dt>Location</dt>
              <dd>{input.location}</dd>
            </div>
            <div>
              <dt>Carpet Area</dt>
              <dd>{input.carpet_area_sqft} sqft</dd>
            </div>
            <div>
              <dt>Floor</dt>
              <dd>{input.floor_num}</dd>
            </div>
            <div>
              <dt>Bathrooms</dt>
              <dd>{input.bathroom}</dd>
            </div>
            <div>
              <dt>Balconies</dt>
              <dd>{input.balcony}</dd>
            </div>
            <div>
              <dt>Car Parking</dt>
              <dd>{input.car_parking}</dd>
            </div>
            <div>
              <dt>Furnishing</dt>
              <dd>{input.furnishing}</dd>
            </div>
            <div>
              <dt>Transaction</dt>
              <dd>{input.transaction}</dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>{input.ownership}</dd>
            </div>
            <div>
              <dt>Facing</dt>
              <dd>{input.facing}</dd>
            </div>
          </dl>

          <div className="result-actions">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Predict Another Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}