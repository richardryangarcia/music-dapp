import {all, takeEvery, put, call, select} from 'redux-saga/effects';
import {SET_STATE, CONTRIBUTE, LOAD_ARTIST_PROJECTS, ADD_USER_AS_MINTER} from './actions';
import ProjectContract from "../../contracts/Project.json";
import { getAccount, getArtists, getWeb3th, getProjects } from '../selectors';

export function* contribute({payload}){
  const {artistId, projectId, amount} = payload;
  const account = yield select(getAccount);
  const loadedProjects = yield select(getProjects);
  const artistProjects = loadedProjects && loadedProjects[artistId];
  const ProjectInstance = artistProjects && artistProjects[projectId] && artistProjects[projectId].instance && artistProjects[projectId].instance.methods;


  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  const l = yield ArtistInstance.isMinter(account).call()

  console.log('account is minter', l, account)
  yield ProjectInstance.buyTokens(account).send({from:account, value: amount });
}

export function* addUserAsMinter({payload}){
  const {artistId} = payload;
  const account = yield select(getAccount);
  const loadedArtists = yield select(getArtists);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  const loadedProjects = yield select(getProjects);
  const artistProjects = loadedProjects && loadedProjects[artistId];
  const ProjectInstance = artistProjects && artistProjects[0] && artistProjects[0].instance && artistProjects[1].instance.methods


  const accountIsMinter = yield ArtistInstance.isMinter(account).call()
  if (!accountIsMinter){
    yield ProjectInstance.addUserAsMinter(account).send({from: account})
  }
}

export function* loadArtistProjects({payload}){
  const {artistId} = payload;
  let projects = {};

  const loadedArtists = yield select(getArtists);
  const web3th = yield select(getWeb3th);
  const ArtistInstance = loadedArtists && loadedArtists[artistId] && loadedArtists[artistId].instance && loadedArtists[artistId].instance.methods;
  
  const projectCount = yield ArtistInstance.projectCount().call();

  let i;
  for (i = 0; i < projectCount; i++){
    const projectAddress = yield ArtistInstance.getProject(i).call();
    const instance = yield new web3th.Contract(
      ProjectContract.abi,
      projectAddress
    );
    const projectDetails = yield instance.methods.fetchProject().call();
    const projectIsMinter = yield ArtistInstance.isMinter(projectAddress).call()

    const {owner, name, imageHash, description, rate, ownerWallet, cap, weiRaised, capReached} = projectDetails;
    projects = Object.assign(projects, {
      [i]:{
        address: projectAddress,
        projectId: i,
        instance, 
        owner, 
        name, 
        imageHash, 
        description,
        rate: rate.toString(), 
        ownerWallet,
        cap: cap.toString(), 
        weiRaised: weiRaised.toString(),
        capReached,
        projectIsMinter
      }
    })
  };

  yield put({
    type: SET_STATE,
    payload: {
      [artistId]: projects
    }
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(CONTRIBUTE, contribute),
    takeEvery(LOAD_ARTIST_PROJECTS, loadArtistProjects),
    takeEvery(ADD_USER_AS_MINTER, addUserAsMinter)
  ])
}
