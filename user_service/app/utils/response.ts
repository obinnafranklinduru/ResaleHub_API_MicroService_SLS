/**
 * Formats the HTTP response object based on the provided parameters.
 * @param statusCode - HTTP status code
 * @param message - Response message
 * @param data - Response data (optional)
 * @returns Formatted HTTP response object
 */
const formatResponse = (statusCode: number, message: string, data?: unknown) => {
    return {
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message, data }),
    };
};

/**
 * Generates a successful HTTP response.
 * @param data - Response data to be included (optional)
 * @returns Formatted HTTP success response object
 */
export const SuccessResponse = (data?: object) => {
    return formatResponse(200, "success", data);
};

/**
 * Generates an HTTP error response.
 * @param code - Error code (default: 1000)
 * @param error - Error details or message
 * @returns Formatted HTTP error response object
 */
export const ErrorResponse = (code: number = 1000, error: any) => {
    console.log("error =>", error)

    if (error.name.toLowerCase().trim() === "zoderror") {
        // Handle zod errors
        const errorMessage = error.issues[0].message || "Validation Error Occurred";
        
        return formatResponse(code, "failed", errorMessage);
    }

    if (Array.isArray(error)) {
        // Handle validation errors
        const errorObject = error[0].constraints;
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || "Error Occurred";

        return formatResponse(code, "failed", errorMessage);
    }

    // Handle other types of errors
    return formatResponse(code, "failed", error.message);
};