import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import applicationReducer from './application/reducers';
import ArtistFactoryReducer from './ArtistFactory/reducers';
import ArtistReducer from './Artist/reducers';
import ProjectReducer from './Project/reducers';


export default history =>
  combineReducers({
    application: applicationReducer,
    router: connectRouter(history),
    ArtistFactory: ArtistFactoryReducer,
    Artist: ArtistReducer,
    Project: ProjectReducer
  })