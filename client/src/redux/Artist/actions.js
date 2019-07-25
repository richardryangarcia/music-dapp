export const SET_STATE='@@Artist/SET_STATE';
export const LOAD_ARTIST='@@Artist/LOAD_ARTIST';
export const UPDATE_ADDRESS='@@Artist/UPDATE_ADDRESS';
export const FETCH_ARTIST='@@Artist/FETCH_ARTIST';

export const loadArtist = (address) => {
    return {
        type: LOAD_ARTIST,
        payload: {
            address
        }
    }
}