import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

/**
 * Extracts validation error messages from a validation error object.
 *
 * @param {Record<string, any>} error - The validation error object.
 * @returns {Record<string, string>} - An object containing the validation
 * error messages, with the keys being the field names and the values being
 * the error messages.
 */
export const getValidationMessage = (error: Record<string, any>) => {
    // Reduce the error object into a new object, where the field names are
    // the keys and the error messages are the values.
    return Object.entries(error).reduce((acc: Record<string, string>, [key, value]) => {
        // If the key is not "_errors" and the value is an object with "_errors",
        // add the field name and the error message to the result object.
        if (key !== "_errors" && typeof value === "object" && "_errors" in value) {
            return {
                ...acc,
                [key]: value._errors.join(", "),
            };
        }
        // Otherwise, return the accumulator unchanged.
        return acc;
    }, {});
};