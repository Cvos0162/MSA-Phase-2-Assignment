import * as React from 'react';
import * as ReactDOM from 'react-dom';  
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(245, 245, 220)',
        dark: '#000'
     },
     secondary: {
       main: 'rgb(070, 093, 114)',
     },
     error: {
      main: 'rgb(149, 056, 058)',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme = { theme }>
      <App />
   </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
