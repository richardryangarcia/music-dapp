import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import ArtistSignUp from './components/form/artistSignupForm';
import AddMerchForm from './components/form/addMerch';
import ArtistList from './containers/artistList';
import Artist from './containers/artist';
import ProjectCreateForm from './components/form/projectCreateForm';

const routes = [
  {
    path: '/artist-signup',
    component: ArtistSignUp,
    exact: true
  },
  {
    path: '/add-merch/:id',
    component: AddMerchForm,
    exact: true
  },
  {
    path: '/project-create/:id',
    component: ProjectCreateForm,
    exact: true
  },
  {
    path: '/artists',
    component: ArtistList,
    exact: true
  }, 
  {
    path: '/artist/:id',
    component: Artist, 
    exact: true
  }
];

class Router extends React.Component {
  render(){
    const {history} = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/artists" />}/>
          {
            routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))
          }
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default Router;