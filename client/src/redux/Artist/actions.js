export const SET_STATE='@@Artist/SET_STATE';
export const LOAD_ARTIST='@@Artist/LOAD_ARTIST';
export const UPDATE_ADDRESS='@@Artist/UPDATE_ADDRESS';
export const FETCH_ARTIST='@@Artist/FETCH_ARTIST';
export const ADD_MERCH='@@Artist/ADD_MERCH';
export const GET_MERCH='@@Artist/GET_MERCH';
export const CREATE_PROJECT='@@Artist/CREATE_PROJECT';
export const BUY_MERCH='@@Artist/BUY_MERCH';
export const ADD_PROJECT_AS_MINTER='@@Artist/ADD_ARTIST_AS_MINTER';

export const addProjectAsMinter = (payload) => {
    return {
        type: ADD_PROJECT_AS_MINTER,
        payload
    }
}

export const addMerch = (payload) => {
    return {
        type: ADD_MERCH,
        payload
    }
}

export const getMerch = (artistId) => {
    return {
        type: GET_MERCH,
        payload: {
            artistId
        }
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
        type: BUY_MERCH,
        payload
    }
}