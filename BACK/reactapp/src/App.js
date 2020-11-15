import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'fontsource-roboto';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Accueil from "./Accueil";

// import MessagerieC from '../SrmessagerieC';
import FavorisC from './SrC/FavorisC';
import ProfilC from './SrC//ProfilC';
import CatalogueC from './SrC/CatalogueC';

// import MessagerieV from '../SrmessagerieC';
import CaveV from './SrV/CaveV';
import ProfilV from './SrV/ProfilV';
import BouteilleV from './SrV/BouteilleV';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';
import token from './reducers/token';
import domaine from './reducers/domaine';
// import message from './reducers/messageRead';
// import messageSend from './reducers/messageSend';

const store = createStore(combineReducers({ userstatus, token, domaine }));

function App() {
  return (

    <Provider store={store}>

      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
          {/* <Route component={MessagerieC} path="/SrmessagerieC" exact /> */}
          <Route component={FavorisC} path="/FavorisC" exact />
          <Route component={ProfilC} path="/ProfilC" exact />
          <Route component={CatalogueC} path="/CatalogueC" exact />

          {/* <Route component={MessagerieV} path="/SrmessagerieV" exact /> */}
          <Route component={CaveV} path="/CaveV" exact />
          <Route component={ProfilV} path="/ProfilV" exact />
          <Route component={BouteilleV} path="/BouteilleV" exact />
        </Switch>
      </Router>

    </Provider>

  );
}

export default App;
