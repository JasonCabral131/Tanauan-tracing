import React from 'react';

import {Provider} from 'react-redux';
import {Store} from './redux/store';
import Main from './screen/mainScreen';
const App = props => {
  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  );
};

export default App;
