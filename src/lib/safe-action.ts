import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "ActionError";
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return {
        error: error.message,
        statusCode: error.statusCode, // Include status code in the response
      };
    }
    // Fallback for unexpected errors
    return {
      error: "An unexpected error occurred",
      statusCode: 500, // Default to 500 for generic server errors
    };
  },
});
