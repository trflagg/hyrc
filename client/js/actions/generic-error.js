export const ERROR = 'ERROR';

export function createGenericError(error) {
  return { type: ERROR, error };
}

export function clearGenericError() {
  return { type: ERROR, error: null };
}
