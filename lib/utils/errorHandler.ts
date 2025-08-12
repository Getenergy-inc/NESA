// Error types and utilities for graceful error handling

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ExternalServiceError extends Error {
  constructor(message: string, public service: string, public originalError?: any) {
    super(message);
    this.name = 'ExternalServiceError';
  }
}

// Error message mappings for user-friendly messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection and try again.',
  TIMEOUT_ERROR: 'The request is taking longer than expected. Please try again.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again in a few moments.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DUPLICATE_EMAIL: 'This email is already registered on our waitlist.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  DATABASE_ERROR: 'We\'re experiencing technical difficulties. Please try again later.',
  SHEETS_ERROR: 'Your submission was saved, but we couldn\'t sync it to our tracking system. Don\'t worry, you\'re still on the waitlist!',
  RATE_LIMIT: 'Too many requests. Please wait a moment before trying again.',
  MAINTENANCE: 'We\'re currently performing maintenance. Please try again in a few minutes.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
};

// Utility function to create a fetch request with timeout
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 30000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new TimeoutError();
    }
    
    if (!navigator.onLine) {
      throw new NetworkError('No internet connection detected');
    }
    
    throw new NetworkError('Network request failed', error);
  }
};

// Utility function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = ERROR_MESSAGES.SERVER_ERROR;
    let errorDetails: any = null;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorDetails = errorData;
    } catch {
      // If we can't parse the error response, use status-based messages
      switch (response.status) {
        case 400:
          errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        case 409:
          errorMessage = ERROR_MESSAGES.DUPLICATE_EMAIL;
          break;
        case 429:
          errorMessage = ERROR_MESSAGES.RATE_LIMIT;
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    }

    const apiError: ApiError = {
      message: errorMessage,
      status: response.status,
      details: errorDetails
    };

    throw apiError;
  }

  return response.json();
};

// Utility function to get user-friendly error message
export const getUserFriendlyErrorMessage = (error: any): string => {
  if (error instanceof TimeoutError) {
    return ERROR_MESSAGES.TIMEOUT_ERROR;
  }
  
  if (error instanceof NetworkError) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error instanceof ValidationError) {
    return error.message || ERROR_MESSAGES.VALIDATION_ERROR;
  }
  
  if (error instanceof DatabaseError) {
    return ERROR_MESSAGES.DATABASE_ERROR;
  }
  
  if (error instanceof ExternalServiceError) {
    if (error.service === 'sheets') {
      return ERROR_MESSAGES.SHEETS_ERROR;
    }
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  // Handle API errors
  if (error.status) {
    switch (error.status) {
      case 400:
        return error.message || ERROR_MESSAGES.VALIDATION_ERROR;
      case 409:
        return ERROR_MESSAGES.DUPLICATE_EMAIL;
      case 429:
        return ERROR_MESSAGES.RATE_LIMIT;
      case 500:
      case 502:
      case 503:
      case 504:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  // Handle specific error messages
  if (typeof error === 'string') {
    return error;
  }

  if (error.message) {
    // Check for specific error patterns
    if (error.message.includes('duplicate') || error.message.includes('already exists')) {
      return ERROR_MESSAGES.DUPLICATE_EMAIL;
    }
    
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return ERROR_MESSAGES.VALIDATION_ERROR;
    }
    
    if (error.message.includes('network') || error.message.includes('connection')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    return error.message;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

// Retry utility with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on validation errors or client errors
      if (error instanceof ValidationError || 
          ((error as any)?.status && (error as any).status >= 400 && (error as any).status < 500)) {
        throw error;
      }

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

// Connection status checker
export const checkConnectionStatus = (): boolean => {
  return navigator.onLine;
};

// Simple health check function
export const performHealthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout('/api/health', {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
};