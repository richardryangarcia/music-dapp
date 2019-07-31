import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, LOAD_ARTIST, UPDATE_ADDRESS, FETCH_ARTIST, ADD_MERCH, CREATE_PROJECT, BUY_MERCH, GET_MERCH, ADD_PROJECT_AS_MINTER} from './actions';
import ArtistContract from "../../contracts/Artist.json";
import {getAccount, getArtists, getWeb3th} from '../selectors';

export const getArtist = (state) => state.Artist

export function* addMerch({payload}) {
  const account = yield select(getAccount);
  const {name, description, quantity, price, ipfsHash, artistId} = payload;
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  let response = yield ArtistInstance.addMerch(name, description, quantity, price, ipfsHash).send({ from: account });
}

export function* getMerch({payload}){
  const {artistId} = payload;
  let merch = {};
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  const merchCount = yield ArtistInstance.merchandiseCount().call();

  let i;
  for (i = 0; i < merchCount; i++){
    const merchObj = yield ArtistInstance.getMerch(i).call();
    merch = Object.assign(merch, {
      [i]: {
        merchId: i,
        imageUrl: merchObj.imageUrl,
        name: merchObj.name, 
        description: merchObj.description,
        isAvailable: merchObj.isAvailable,
        price: merchObj.price.toString(),
        quantity: merchObj.quantity.toString()
      }
    });
  }
  
  yield put({
    type: SET_STATE,
    payload: {
      merchandise: {
        [artistId]: merch
      }
    }
  })
  
}

export function* fetchArtist({payload}){
  yield put({
    type: SET_STATE,
    payload: {
      loading: true
    }
  })

  const account = yield select(getAccount);
  const {artistId, address, instance} = payload;
  const response = yield instance.methods.fetchArtist().call();
  const {name, bio, genre, location, merchCount, projectCount, owner, imageHash} = response;
  const buyerBalance = yield instance.methods.balanceOf(account).call();


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
        buyerBalance: buyerBalance.toString(),
        merchCount: merchCount.toString(),
        projectCount: projectCount.toString()
      }
    }
  })

}

export function* loadArtist({payload}){
  const {artistId, address} = payload;  


  if (address && address != '0x0000000000000000000000000000000000000000'){
    let web3th = yield select(getWeb3th); 

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
    yield ArtistInstance.createProject(parseInt(rate), parseInt(cap), name, description, ipfsHash).send({from: account});
  }

  yield put({
    type: ADD_PROJECT_AS_MINTER,
    payload: {
      artistId
    }
  })
}

export function* addProjectAsMinter({payload}){
  const {artistId, address} = payload
  const account = yield select(getAccount);
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  yield ArtistInstance.addMinter(address).send({from: account});
}

export function* buyMerch({payload}){
  const {artistId, merchId, quantity, total} = payload;
  const account = yield select(getAccount);
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;

  if (ArtistInstance){
    yield ArtistInstance.buyMerch(merchId,quantity, total).send({from: account});
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_ARTIST, loadArtist),
    takeEvery(UPDATE_ADDRESS, updateAddress),
    takeEvery(FETCH_ARTIST, fetchArtist),
    takeEvery(ADD_MERCH, addMerch),
    takeEvery(BUY_MERCH, buyMerch),
    takeEvery(GET_MERCH, getMerch),
    takeEvery(CREATE_PROJECT, createProject),
    takeEvery(ADD_PROJECT_AS_MINTER, addProjectAsMinter)
  ])
}
