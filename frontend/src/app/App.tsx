import '../styles/app.scss';
import AppRouter from './Router';
import { Provider } from 'react-redux';
import store from '../store/store';
import React from 'react';

function App() {
  return (
    <Provider store={store}>
      <div>
        <main>
          <AppRouter />
        </main>
      </div>
    </Provider>
  );
}

export default App;
