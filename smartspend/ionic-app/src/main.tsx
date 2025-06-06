import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import ReactDOM from 'react-dom';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
          <App />
    </Provider>
  </React.StrictMode>
);