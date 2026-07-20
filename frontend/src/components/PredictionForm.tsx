import { useState, useMemo } from "react";
import type { PredictionRequest } from "../types/prediction";
import locationsData from "../data/locations.json";

interface PredictionFormProps {
  onSubmit: (data: PredictionRequest) => void;
  isLoading: boolean;
}

const FURNISHING_OPTIONS = ["Unfurnished", "Semi-Furnished", "Furnished"];
const TRANSACTION_OPTIONS = ["Resale", "New Property"];
const OWNERSHIP_OPTIONS = ["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"];
const FACING_OPTIONS = ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"];

const initialFormState: PredictionRequest = {
  location: "",
  carpet_area_sqft: 0,
  floor_num: 0,
  bathroom: 1,
  balcony: 0,
  car_parking: 0,
  furnishing: FURNISHING_OPTIONS[0],
  transaction: TRANSACTION_OPTIONS[0],
  ownership: OWNERSHIP_OPTIONS[0],
  facing: FACING_OPTIONS[0],
};

export default function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionRequest>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const locations = useMemo(() => locationsData as string[], []);

  function validate(data: PredictionRequest): Record<string, string> {
    const newErrors: Record<string, string> = {};
    if (!data.location) newErrors.location = "Please select a location";
    if (data.carpet_area_sqft <= 0) newErrors.carpet_area_sqft = "Enter a valid area";
    if (data.floor_num < 0) newErrors.floor_num = "Floor cannot be negative";
    if (data.bathroom <= 0) newErrors.bathroom = "Enter at least 1 bathroom";
    if (data.balcony < 0) newErrors.balcony = "Cannot be negative";
    if (data.car_parking < 0) newErrors.car_parking = "Cannot be negative";
    return newErrors;
  }

  function handleChange(field: keyof PredictionRequest, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-grid">
      <div className="field field-full">
        <label className="field-label" htmlFor="location">Location</label>
        <select
          id="location"
          className="select"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {errors.location && <p className="field-error" role="alert">{errors.location}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="carpet_area_sqft">Carpet Area (sqft)</label>
        <input
          id="carpet_area_sqft"
          className="input"
          type="number"
          min="0"
          value={formData.carpet_area_sqft}
          onChange={(e) => handleChange("carpet_area_sqft", Number(e.target.value))}
        />
        {errors.carpet_area_sqft && <p className="field-error" role="alert">{errors.carpet_area_sqft}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="floor_num">Floor Number</label>
        <input
          id="floor_num"
          className="input"
          type="number"
          value={formData.floor_num}
          onChange={(e) => handleChange("floor_num", Number(e.target.value))}
        />
        {errors.floor_num && <p className="field-error" role="alert">{errors.floor_num}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="bathroom">Bathrooms</label>
        <input
          id="bathroom"
          className="input"
          type="number"
          min="1"
          value={formData.bathroom}
          onChange={(e) => handleChange("bathroom", Number(e.target.value))}
        />
        {errors.bathroom && <p className="field-error" role="alert">{errors.bathroom}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="balcony">Balconies</label>
        <input
          id="balcony"
          className="input"
          type="number"
          min="0"
          value={formData.balcony}
          onChange={(e) => handleChange("balcony", Number(e.target.value))}
        />
        {errors.balcony && <p className="field-error" role="alert">{errors.balcony}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="car_parking">Car Parking</label>
        <input
          id="car_parking"
          className="input"
          type="number"
          min="0"
          value={formData.car_parking}
          onChange={(e) => handleChange("car_parking", Number(e.target.value))}
        />
        {errors.car_parking && <p className="field-error" role="alert">{errors.car_parking}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="furnishing">Furnishing</label>
        <select
          id="furnishing"
          className="select"
          value={formData.furnishing}
          onChange={(e) => handleChange("furnishing", e.target.value)}
        >
          {FURNISHING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="transaction">Transaction Type</label>
        <select
          id="transaction"
          className="select"
          value={formData.transaction}
          onChange={(e) => handleChange("transaction", e.target.value)}
        >
          {TRANSACTION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="ownership">Ownership</label>
        <select
          id="ownership"
          className="select"
          value={formData.ownership}
          onChange={(e) => handleChange("ownership", e.target.value)}
        >
          {OWNERSHIP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="facing">Facing</label>
        <select
          id="facing"
          className="select"
          value={formData.facing}
          onChange={(e) => handleChange("facing", e.target.value)}
        >
          {FACING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
          {isLoading ? "Calculating..." : "Predict Price"}
        </button>
      </div>
    </form>
  );
}