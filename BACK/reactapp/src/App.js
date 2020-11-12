import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'fontsource-roboto';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Accueil from "./Sraccueil";

// import MessagerieC from '../SrmessagerieC';
// import FavorisC from '../SrfavorisC';
// import ProfilC from '../SrprofilC';
import CatalogueC from './SrC/SrcatalogueC';

// import MessagerieV from '../SrmessagerieC';
import CaveV from './SrV/SrcaveV';
// import ProfilV from '../SrprofilV';
// import BouteilleV from '../SrbouteilleV';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';
import token from './reducers/token';
// import message from './reducers/messageRead';
// import messageSend from './reducers/messageSend';

const store = createStore(combineReducers({ userstatus, token }));

function App() {
  return (

    <Provider store={store}>

      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
          {/* <Route component={MessagerieC} path="/SrmessagerieC" exact /> */}
          {/* <Route component={FavorisC} path="/SrfavorisC" exact /> */}
          {/* <Route component={ProfilC} path="/SrprofilC" exact /> */}
          <Route component={CatalogueC} path="/SrcatalogueC" exact />

          {/* <Route component={MessagerieV} path="/SrmessagerieV" exact /> */}
          <Route component={CaveV} path="/SrcaveV" exact />
          {/* <Route component={ProfilV} path="/SrprofilV" exact /> */}
          {/* <Route component={BouteilleV} path="/SrbouteilleV" exact /> */}
        </Switch>
      </Router>

    </Provider>

  );
}

export default App;
