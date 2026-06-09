// src/domain/errors/registry.error.ts
// Cartographie code métier (validateurs / BusinessError) → statut HTTP envisagé (usage futur filtres).

import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.PUBLIC_ID_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.USER_ID_INVALID]: {
    httpStatus: 400,
  },

  [CodesError.ROLE_NAME_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.ROLE_DESCRIPTION_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.ROLE_IS_SYSTEM_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.ROLE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.ROLE_NAME_ALREADY_EXISTS]: {
    httpStatus: 409,
  },

  [CodesError.PERMISSION_NAME_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.PERMISSION_DESCRIPTION_INVALID]: {
    httpStatus: 400,
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
  [CodesError.MODE_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.NOTE_INVALID]: {
    httpStatus: 400,
  },

  // Backward compatibility with current validators
  [CodesError.NAME_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.DESCRIPTION_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.ISSYSTEM_INVALID]: {
    httpStatus: 400,
  },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
