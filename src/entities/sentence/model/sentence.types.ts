export interface SelectedWord {
  label: string;
  category: string;
}

export interface SentenceGenerateRequest {
  words: SelectedWord[];
}

export interface SentenceGenerateResponse {
  sentence: string;
}
