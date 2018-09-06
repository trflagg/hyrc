export const CLEAR_ERROR = 'CLEAR_ERROR';
export const ERROR = 'ERROR';

export function createGenericError(error) {
  return { type: ERROR, error };
}

export function clearGenericError() {
  return { type: CLEAR_ERROR };
}
