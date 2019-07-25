import {all, takeEvery, put, call} from 'redux-saga/effects';
import {SET_STATE} from './actions';
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

export default function* rootSaga() {
  yield all([
    loadWeb3()  
  ])
}
