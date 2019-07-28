export const SET_STATE='@@Artist/SET_STATE';
export const LOAD_ARTIST='@@Artist/LOAD_ARTIST';
export const UPDATE_ADDRESS='@@Artist/UPDATE_ADDRESS';
export const FETCH_ARTIST='@@Artist/FETCH_ARTIST';
export const ADD_MERCH='@@Artist/ADD_MERCH';
export const CREATE_PROJECT='@@Artist/CREATE_PROJECT';
export const BUY_MERCH='@@Artist/BUY_MERCH';

export const addMerch = (payload) => {
    return {
        type: ADD_MERCH,
        payload
    }
}

export const loadArtist = (address) => {
    return {
        type: LOAD_ARTIST,
        payload: {
            address
        }
    }
}

export const createProject = (payload) => {
    return {
        type: CREATE_PROJECT,
        payload
    }
}

export const buyMerch = (payload) => {
    return {
        type: CREATE_PROJECT,
        payload
    }
}