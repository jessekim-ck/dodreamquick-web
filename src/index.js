import 'react-app-polyfill/ie9';
import 'core-js/stable'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* redux */
import {Provider} from 'react-redux'
import store from "./redux/store"


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);


serviceWorker.unregister();
