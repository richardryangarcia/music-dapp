export const SET_STATE='@@Project/SET_STATE';
export const LOAD_PROJECT='@@Project/LOAD_PROJECT';
export const CONTRIBUTE='@@Project/CONTRIBUTE';
export const COLLECT='@@Project/COLLECT';

export const contribute = (payload) => {
  return {
    type: CONTRIBUTE,
    payload
  }
}

