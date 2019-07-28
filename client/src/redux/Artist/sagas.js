import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_ARTIST, UPDATE_ADDRESS, FETCH_ARTIST, ADD_MERCH, CREATE_PROJECT, BUY_MERCH} from './actions';
import ArtistContract from "../../contracts/Artist.json";
import {getAccount, getArtists} from '../selectors';
import artist from '../../containers/artist';

export const getProject = (state) => {
    return {
        account: state.application && state.application.account,
        networkId: state.application && state.application.networkId, 
        web3th: state.application && state.application.web3th
    }
}

// export const getAccount = state => state.application && state.application.account

export const getArtist = (state) => state.Artist



export function* addMerch({payload}) {
  console.log('in  heeeeeeere')
  console.log(payload);
  const {name, description, quantity, price, imageUrl, artistId} = payload;
  let {account} = yield select(getProject); 
  console.log(account);
  let contract = yield getArtist(artistId)
  console.log(contract);
  let response = yield contract.addMerch(name, description, quantity, price, imageUrl).send({ from: account });

}

export function* fetchArtist({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const {artistId, address, instance} = payload;
  const response = yield instance.methods.fetchArtist().call();
  const {name, bio, genre, location, merchCount, projectCount, owner, imageHash} = response;


  yield put({
    type: SET_STATE,
    payload: {
      loading: false,
      [artistId]:{
        address,
        instance,
        name,
        owner,
        imageHash,
        bio,
        genre,
        location,
        merchCount: merchCount.toString(),
        projectCount: projectCount.toString()
      }
    }
  })

}

export function* loadArtist({payload}){
  const {artistId, address} = payload;  

  if (address != '0x0000000000000000000000000000000000000000'){
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

export function* createProject({payload}){
  const {artistId, cap, description, ipfsHash, name, rate} = payload;
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  const account = yield select(getAccount);

  if (ArtistInstance){
    console.log('about to create project', parseInt(rate), parseInt(cap))
    const response = yield ArtistInstance.createProject(parseInt(rate), parseInt(cap), name, description, ipfsHash).send({from: account});
    console.log(response);
  }
  console.log('done creating project')

  
  // let artistObject = {}
  // artistObject[artistId] = {
  //   address
  // }

  // yield put({
  //   type: SET_STATE,
  //   payload: {
  //     loading: false,
  //     [artistId]: {address}
  //   }
  // })
}

export function* buyMerch({payload}){
  const {artistId, merchId, quantity} = payload;
  const account = yield select(getAccount);
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;

  if (ArtistInstance){
    console.log('about to buy merch')
    // const response = yield ArtistInstance.createProject(parseInt(rate), parseInt(cap), name, description, ipfsHash).send({from: account});
    // console.log(response);
  }
  console.log('merch purchased')
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_ARTIST, loadArtist),
    takeEvery(UPDATE_ADDRESS, updateAddress),
    takeEvery(FETCH_ARTIST, fetchArtist),
    takeEvery(ADD_MERCH, addMerch),
    takeEvery(BUY_MERCH, buyMerch),
    takeEvery(CREATE_PROJECT, createProject)
  ])
}
