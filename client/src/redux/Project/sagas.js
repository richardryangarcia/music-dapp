import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_PROJECT, CONTRIBUTE} from './actions';
import ProjectContract from "../../contracts/Project.json";
import { getAccount } from '../selectors';

export const getProject = (state) => {
    return {
        account: state.application && state.application.account,
        networkId: state.application && state.application.networkId, 
        web3th: state.application && state.application.web3th
    }
}

export function* loadProject(){

  let {account, networkId, web3th} = yield select(getProject); 

  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const deployedNetwork = yield ProjectContract.networks[networkId];

  const instance = yield new web3th.Contract(
    ProjectContract.abi,
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

export function* contribute({payload}){
  const {artistId, projectId, amount} = payload;
  const account = yield select(getAccount);

}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_PROJECT, loadProject),
    takeEvery(CONTRIBUTE, contribute)
  ])
}
