import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_ARTIST, UPDATE_ADDRESS, FETCH_ARTIST} from './actions';
import ArtistContract from "../../contracts/Artist.json";
import artist from '../../containers/artist';

export const getProject = (state) => {
    return {
        account: state.application && state.application.account,
        networkId: state.application && state.application.networkId, 
        web3th: state.application && state.application.web3th
    }
}

export const getArtist = (state) => state.Artist

export function* fetchArtist({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const {artistId, address, instance} = payload;
  const response = yield instance.methods.fetchArtist().call();


  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      [artistId]:{
        address,
        instance,
        bio: response._bio,
        genre: response._genre,
        location: response._location,
        merchCount: response._merchCount.toString(),
        projectCount: response._projectCount.toString(),
        owner: response._owner,
        imageHash: response._url
      }
    }
  })

}

export function* loadArtist({payload}){
  const {artistId, address} = payload;  
  let {web3th} = yield select(getProject); 

  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const instance = yield new web3th.Contract(
    ArtistContract.abi,
    address
  );

  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      [artistId]: {
        address,
        instance
      }
    }
  })

  yield put({
    type: FETCH_ARTIST,
    payload: {
      artistId,
      address, 
      instance
    }
  })
}

export function* updateAddress({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const {artistId, address} = payload;
  let artistObject = {}
  artistObject[artistId] = {
    address
  }

  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      [artistId]: {address}
    }
  })

  yield put({
    type: LOAD_ARTIST,
    payload: {
      artistId,
      address
    }
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_ARTIST, loadArtist),
    takeEvery(UPDATE_ADDRESS, updateAddress),
    takeEvery(FETCH_ARTIST, fetchArtist)
  ])
}
