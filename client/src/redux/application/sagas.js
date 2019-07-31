import {all, takeEvery, put, call, take} from 'redux-saga/effects';
import {SET_STATE, OPEN_TOAST, CLOSE_TOAST} from './actions';
import getWeb3 from "../../utils/getWeb3";
import {LOAD_ARTIST_FACTORY} from '../ArtistFactory/actions';

export function* loadWeb3(){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const web3 = yield call(getWeb3);
  const web3th = web3.eth;
  const accounts = yield web3.eth.getAccounts();
  const account = accounts[0] || null
  const networkId = yield web3.eth.net.getId();

  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      account,
      networkId,
      web3th,
      web3
    }
  })

  yield put({
    type: LOAD_ARTIST_FACTORY
  })

}

export function* openToast({payload}){
  const {message} = payload;
  yield put({
    type: SET_STATE,
    payload: {
      toastOpen: true,
      toastMessage: message
    }
  })
} 

export function* closeToast(){
  console.log('in here')
  yield put({
    type: SET_STATE,
    payload: {
      toastOpen: false,
      toastMessage: ''
    }
  })
} 

export default function* rootSaga() {
  yield all([
    loadWeb3(),
    takeEvery(CLOSE_TOAST, closeToast),
    takeEvery(OPEN_TOAST, openToast)
  ])
}
