type HttpStatusCode =
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // Conflict
  | 500 // Internal Server Error
  | 503; // Service Unavailable

export interface ApiResponse<T = any> {
  statusCode: HttpStatusCode;
  message?: string;
  error?: string;
  data?: T;
}


export interface ApiResponseValidateEmail {
  email: string
}