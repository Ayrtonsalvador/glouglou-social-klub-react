import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Accueil from './Sraccueil';
import Messagerie from './Srmessagerie';
import Favoris from './Srfavoris';
import Profil from './Srprofil';
import Catalogue from './Srcatalogue';

function App() {
  return (

      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
          <Route component={Messagerie} path="/Srmessagerie" exact />
          <Route component={Favoris} path="/Srfavoris" exact />
          <Route component={Profil} path="/Srprofil" exact />
          <Route component={Catalogue} path="/Srcatalogue" exact />
        </Switch>
      </Router>

 
  );
}

export default App;
