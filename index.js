/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import reducer from './src/store/reducers';
import { name as appName } from './app.json';
import React from 'react'

//redux
import { Provider } from 'react-redux';

const store = createStore(reducer);

const app = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => app);
