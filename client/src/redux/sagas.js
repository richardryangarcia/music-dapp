import {all} from 'redux-saga/effects';
import applicationSagas from './application/sagas';
import ArtistFactorySagas from './ArtistFactory/sagas';
import ArtistSagas from './Artist/sagas';
import ProjectSagas from './Project/sagas';



export default function* rootSaga(){
  yield all([
    applicationSagas(),
    ArtistFactorySagas(),
    ArtistSagas(),
    ProjectSagas()
  ])
}