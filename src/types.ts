export interface ApiResponse {
  statusCode: number;
  body: any; // This could be more specific based on your API response.. this is just a demo
  headers: {
    [key: string]: string;
  };
}

export interface ApiState {
  loading: boolean;
  response: ApiResponse | null;
  parsedBody: any; // Add this to store the parsed body separately
  error: string | null;
}

export interface AmplifyApiError {
  name: string;
  message: string;
  _response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
}
