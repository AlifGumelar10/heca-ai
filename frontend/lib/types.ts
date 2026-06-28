export type PredictionResult = {
  input_text: string;
  clean_text: string;
  prediction: string;
  credibility: number;
  confidence: number;
  credibility_level: string;
  credibility_color: "green" | "orange" | "red" | string;
  prediction_set: string[];
  prediction_set_size: number;
  epsilon: number;
  top_classes: string[];
  top_pvalues: number[];
  top_similarity: number[];
  top_distance: number[];
};

export type ConsultationResponse = {
  data: PredictionResult;
  id: number;
  created_at: string;
};

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "bot"; result: PredictionResult }
  | { id: string; role: "bot-loading" }
  | { id: string; role: "bot-error"; text: string };
