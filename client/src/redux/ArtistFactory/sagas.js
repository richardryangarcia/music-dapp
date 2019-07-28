import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_ARTIST_FACTORY, ADD_ARTIST, GET_ARTIST_ADDRESS} from './actions';
import {UPDATE_ADDRESS} from '../Artist/actions';
import ArtistFactoryContract from "../../contracts/ArtistFactory.json";

export const getProject = (state) => {
    return {
        account: state.application && state.application.account,
        networkId: state.application && state.application.networkId, 
        web3th: state.application && state.application.web3th
    }
}

export const getFactory = (state) => {
  return {
      contract: state.ArtistFactory && state.ArtistFactory.instance && state.ArtistFactory.instance.methods,
      account: state.application && state.application.account
  }
}

export function* loadArtistFactory(){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })
  let {account, networkId, web3th} = yield select(getProject); 
  const deployedNetwork = yield ArtistFactoryContract.networks[networkId];
  const instance = yield new web3th.Contract(
    ArtistFactoryContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      instance
    }
  })
}

export function* addArtist({payload}){

  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })
  const {name, symbol, genre, bio, location, ipfsHash} = payload;
  let {contract,account} = yield select(getFactory); 
  let response;


  
  console.log('about to create artist')
  if (contract) {
    response = yield contract.addArtist(name, symbol, genre, bio, location, ipfsHash).send({ from: account });
  }

  console.log('artist was added!!!!!!!!!!!')
  console.log(response);

  yield put({
    type: SET_STATE,
    payload: {
      loading: false
    }
  })
}

export function* getArtistAddress({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const {artistId} = payload;
  let {contract} = yield select(getFactory); 


  const address = yield contract.getArtist(artistId).call();

  yield put({
    type: SET_STATE,
    payload: {
      loading: false
    }
  })

  yield put({
    type:UPDATE_ADDRESS,
    payload: {
      artistId,
      address
    }
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_ARTIST_FACTORY, loadArtistFactory),
    takeEvery(ADD_ARTIST, addArtist),
    takeEvery(GET_ARTIST_ADDRESS, getArtistAddress)
  ])
}
