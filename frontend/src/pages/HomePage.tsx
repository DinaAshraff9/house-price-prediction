import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: PredictionRequest) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await predictPrice(data);
      navigate("/result", { state: { price: result.predicted_price, input: data } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">HP</span>
          <span className="brand-name">House Price Estimator</span>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">Instant property valuation</p>
        <h1>What's your property worth?</h1>
        <p className="hero-sub">
          Enter a few details about the property and get a data-driven price
          estimate in seconds.
        </p>
      </section>

      <div className="layout">
        <div className="card form-card">
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}
          <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <aside className="card sidebar-card">
          <h2>How it works</h2>
          <ol className="steps">
            <li>
              <span className="step-num">01</span>
              <div>
                <strong>Enter details</strong>
                <p>Location, size, amenities and more.</p>
              </div>
            </li>
            <li>
              <span className="step-num">02</span>
              <div>
                <strong>We run the model</strong>
                <p>A trained regression model scores the property.</p>
              </div>
            </li>
            <li>
              <span className="step-num">03</span>
              <div>
                <strong>Get your estimate</strong>
                <p>See a price estimate instantly.</p>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  );
}