import type { PredictionRequest, PredictionResponse, ApiError } from "../types/prediction";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function predictPrice(
  payload: PredictionRequest
): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData: ApiError = await response.json();
      if (typeof errorData.detail === "string") {
        message = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        message = errorData.detail.map((e) => e.msg).join(", ");
      }
    } catch {
      // response body wasn't JSON, keep the generic message
    }
    throw new Error(message);
  }

  return response.json();
}