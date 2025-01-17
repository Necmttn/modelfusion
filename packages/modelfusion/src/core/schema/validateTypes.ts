import { Schema } from "./Schema.js";
import { TypeValidationError } from "./TypeValidationError.js";

/**
 * Validates the types of an unknown object using a schema and
 * return a strongly-typed object.
 *
 * @template T - The type of the object to validate.
 * @param {string} options.value - The object to validate.
 * @param {Schema<T>} options.schema - The schema to use for validating the JSON.
 * @returns {T} - The typed object.
 */
export function validateTypes<T>({
  value,
  schema,
}: {
  value: unknown;
  schema: Schema<T>;
}): T {
  try {
    const validationResult = schema.validate(value);

    if (!validationResult.success) {
      throw new TypeValidationError({
        value,
        cause: validationResult.error,
      });
    }

    return validationResult.value;
  } catch (error) {
    if (error instanceof TypeValidationError) {
      throw error;
    }

    throw new TypeValidationError({ value, cause: error });
  }
}

/**
 * Safely validates the types of an unknown object using a schema and
 * return a strongly-typed object.
 *
 * @template T - The type of the object to validate.
 * @param {string} options.value - The JSON object to validate.
 * @param {Schema<T>} options.schema - The schema to use for validating the JSON.
 * @returns An object with either a `success` flag and the parsed and typed data, or a `success` flag and an error object.
 */
export function safeValidateTypes<T>({
  value,
  schema,
}: {
  value: unknown;
  schema: Schema<T>;
}):
  | { success: true; value: T }
  | { success: false; error: TypeValidationError } {
  try {
    const validationResult = schema.validate(value);

    if (validationResult.success) {
      return validationResult;
    }

    return {
      success: false,
      error: new TypeValidationError({
        value,
        cause: validationResult.error,
      }),
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof TypeValidationError
          ? error
          : new TypeValidationError({ value, cause: error }),
    };
  }
}
