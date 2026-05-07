export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
