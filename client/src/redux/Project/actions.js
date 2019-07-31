export const SET_STATE='@@Project/SET_STATE';
export const LOAD_PROJECT='@@Project/LOAD_PROJECT';
export const CONTRIBUTE='@@Project/CONTRIBUTE';
export const COLLECT='@@Project/COLLECT';
export const LOAD_ARTIST_PROJECTS='@@Project/LOAD_ARTIST_PROJECTS';
export const ADD_USER_AS_MINTER='@@Project/ADD_USER_AS_MINTER';


export const loadArtistProjects = (artistId) => {
  return {
    type: LOAD_ARTIST_PROJECTS,
    payload: {
      artistId
    }
  }
}

export const contribute = (payload) => {
  return {
    type: CONTRIBUTE,
    payload
  }
}

export const addUserAsMinter = (payload) => {
  return {
    type: ADD_USER_AS_MINTER,
    payload
  }
}

