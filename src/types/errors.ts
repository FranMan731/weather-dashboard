export type ApiError = {
  message: string;
  code?: number;
  details?: unknown;
};

export const toApiError = (error: unknown): ApiError => {
  //Controling Cognito Errors
  if (typeof error === 'object' && error !== null) {
    const cognitoError = error as { 
      code?: string; 
      message?: string;
      name?: string;
    };
    
    if (cognitoError.code) {
      return {
        message: cognitoError.message || cognitoError.code,
        code: parseInt(cognitoError.code) || undefined,
        details: cognitoError
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack,
    };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  if (typeof error === "object" && error !== null) {
    return {
      message: (error as { message?: string }).message || "Unknown error",
      code: (error as { code?: number }).code,
      details: error,
    };
  }
  return { message: "An unknown error occurred" };
};

export const getErrorMessage = (error: unknown): string => {
  return toApiError(error).message;
};
