// src/application/errors/registry.error.ts
// Cartographie code métier (use cases / ApplicationError) → statut HTTP envisagé (usage futur filtres).

import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.DATA_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.PUBLIC_ID_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.USER_ID_INVALID]: {
    httpStatus: 400,
  },

  [CodesError.ROLE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.ROLE_NAME_ALREADY_EXISTS]: {
    httpStatus: 409,
  },

  [CodesError.PERMISSION_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.PERMISSION_NAME_ALREADY_EXISTS]: {
    httpStatus: 409,
  },

  [CodesError.USER_ROLE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.USER_ROLE_ALREADY_EXISTS]: {
    httpStatus: 409,
  },

  [CodesError.ROLE_PERMISSION_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.ROLE_PERMISSION_ALREADY_EXISTS]: {
    httpStatus: 409,
  },

  [CodesError.PERMISSION_OVERRIDE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.PERMISSION_OVERRIDE_ALREADY_EXISTS]: {
    httpStatus: 409,
  },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
