import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}

export default App;
