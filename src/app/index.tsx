import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { Menu, Grid } from 'semantic-ui-react';
// Polyfills
import 'rxjs';
import 'babel-polyfill';
import 'whatwg-fetch';
// Styles
import './index.scss';
// App
import * as basic from './basic';
import * as sync from './sync-validation';

import { epics } from './epics';
import { reducers, Stores } from './reducers';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware( history );


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers<Stores>( {
        ...reducers
    } ),
    composeWithDevTools(
        applyMiddleware(
            createEpicMiddleware( epics ),
            middleware
        )
    )
);

const MyApp = () => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div className="app">
                <Menu fixed="top" inverted>
                    <Menu.Item as={ NavLink } to="/basic">Basic</Menu.Item>
                    <Menu.Item as={ NavLink } to="/basic-semantic">Basic with Semantic</Menu.Item>
                    <Menu.Item as={ NavLink } to="/field-validation-sync">Field Validation Sync</Menu.Item>
                </Menu>
                <div className="content">
                    <Switch>
                        <Route exact path="/basic" component={ basic.BasicForm }/>
                        <Route exact path="/basic-semantic" component={ basic.SemanticBasicForm }/>
                        <Route exact path="/basic-semantic" component={ basic.SemanticBasicForm }/>
                        <Route exact path="/field-validation-sync" component={ sync.FieldValidationForm }/>
                        <Redirect to="/basic"/>
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>
);

export default function () {
    const app = document.getElementById( 'app' );
    if( app != null ) {
        ReactDom.render( <MyApp/>, app );
    }
}