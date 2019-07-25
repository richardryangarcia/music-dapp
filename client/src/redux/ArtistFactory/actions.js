export const SET_STATE='@@ArtistFactory/SET_STATE';
export const LOAD_ARTIST_FACTORY='@@ArtistFactory/LOAD_ARTIST_FACTORY';
export const ADD_ARTIST='@@ArtistFactory/ADD_ARTIST';
export const GET_ARTIST_ADDRESS='@@ArtistFactory/GET_ARTIST_ADDRESS';

export const addArtist = (payload) => {
    return {
        type: ADD_ARTIST,
        payload
    }
}

export const getArtistAddress = (id) => {
    return {
        type: GET_ARTIST_ADDRESS,
        payload: {
            artistId: id
        }
    }
}