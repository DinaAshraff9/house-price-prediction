import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">HP</span>
          <span className="brand-name">House Price Estimator</span>
        </div>
      </header>
      <div className="not-found-card card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link className="btn btn-primary" to="/">Go back home</Link>
      </div>
    </div>
  );
}