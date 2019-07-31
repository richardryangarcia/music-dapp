import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_ARTIST_FACTORY, ADD_ARTIST, GET_ARTIST_ADDRESS} from './actions';
import {UPDATE_ADDRESS} from '../Artist/actions';
import {OPEN_TOAST} from '../application/actions';
import {getWeb3th, getNetworkId, getAccount, getFactory} from '../selectors';
import ArtistFactoryContract from "../../contracts/ArtistFactory.json";

export function* loadArtistFactory(){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const networkId = yield select(getNetworkId);
  const web3th = yield select(getWeb3th);
  const deployedNetwork = yield ArtistFactoryContract.networks[networkId];
  const instance = yield new web3th.Contract(
    ArtistFactoryContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      address: deployedNetwork.address,
      instance
    }
  })
}

export function* addArtist({payload}){
  const {name, symbol, genre, bio, location, ipfsHash} = payload;
  let account = yield select(getAccount);
  let contract = yield select(getFactory);
  let response;

  if (contract && contract.methods) {
    yield call(contract.methods.addArtist(name, symbol, genre, bio, location, ipfsHash).send({ from: account }));
  }
}

export function* getArtistAddress({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const {artistId} = payload;
  let contract = yield select(getFactory); 


  const address = yield contract.methods.getArtist(artistId).call();

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
