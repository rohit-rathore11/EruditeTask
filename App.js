import React from 'react'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import PokemonManager from './src/components/PokemonManager';

const App = () => {
  return (
    <Provider store={store}>
      <PokemonManager/>
    </Provider>
  );
};

export default App;