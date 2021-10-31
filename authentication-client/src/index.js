import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const store = createStore(reducers, { auth: { authenticated: localStorage.getItem('token') } }, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path='/' exact component={Welcome} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/signout' exact component={Signout} />
                <Route path='/feature' exact component={Feature} />
                <Route path='/signin' exact component={Signin} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
