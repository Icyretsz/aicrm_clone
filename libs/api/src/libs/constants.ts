import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import {createErrorSchema, createMessageObjectSchema} from 'stoker/openapi/schemas';
import {object, z} from "zod";

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: 'Required',
  EXPECTED_NUMBER: 'Expected number, received nan',
  NO_UPDATES: 'No updates provided',
};

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: 'invalid_updates',
};

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
export const unauthorizedUserSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED);
export const conflictSchema = createMessageObjectSchema(HttpStatusPhrases.CONFLICT);
export const internalErrorSchema = createMessageObjectSchema(HttpStatusPhrases.INTERNAL_SERVER_ERROR)
