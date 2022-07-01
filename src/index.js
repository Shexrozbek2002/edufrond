import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './registerServiceWorker';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <AuthContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthContextProvider>,
  document.getElementById('app')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
