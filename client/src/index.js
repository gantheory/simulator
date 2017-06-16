import React from 'react';
import ReactDOM from 'react-dom';
import Introduction from './js/Introduction.js';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey400} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Bitter',
  palette: {
    primary1Color: '#74D6CA',
    accent1Color: '#F98C95',
    textColor: grey50,
    disabledColor: grey400,
  },
  button: {
    minWidth: 44,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Introduction />
  </MuiThemeProvider>
  , document.getElementById('root')
);
registerServiceWorker();
