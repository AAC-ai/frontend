export interface SelectedWord {
  label: string;
  category: string;
  emoji?: string;
}

export interface SentenceGenerateRequest {
  words: SelectedWord[];
}

export interface SentenceGenerateResponse {
  sentence: string;
}
