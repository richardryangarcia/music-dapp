export const SET_STATE='@@application/SET_STATE';
export const OPEN_TOAST='@@application/OPEN_TOAST';
export const CLOSE_TOAST='@@application/CLOSE_TOAST';

export const closeToast = () => {
  return {
    type: CLOSE_TOAST
  }
}
