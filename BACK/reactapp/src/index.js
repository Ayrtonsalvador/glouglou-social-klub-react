import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {MuiThemeProvider , createMuiTheme, responsiveFontSizes} from '@material-ui/core';
import {yellow , grey} from '@material-ui/core/colors';

let theme = createMuiTheme({

  spacing: [2, 4, 8, 16, 32, 64],
 
  palette:{
    primary:{
      main: yellow[700],
      light: yellow[400],
      dark: yellow[900]
    },
    secondary: {
      main : grey[800],
      light : grey[300],
      dark : grey[600]
    },},

});
theme = responsiveFontSizes(theme);

ReactDOM.render(<MuiThemeProvider theme={theme}><App/></MuiThemeProvider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
