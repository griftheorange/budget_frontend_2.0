import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import defaultStore from './redux/defaultStore';

import AppRouter from './AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={defaultStore}>
      <AppRouter/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
