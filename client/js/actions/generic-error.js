export const CLEAR_ERROR = 'CLEAR_ERROR';
export const ERROR = 'ERROR';

export function createGenericErrorAction(error) {
  return { type: ERROR, error };
}

export function clearGenericErrorAction() {
  return { type: CLEAR_ERROR };
}
