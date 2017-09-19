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
import { Menu, Grid, Modal, Button, Divider, Dropdown } from 'semantic-ui-react';
import { TreeFileView } from '../components/tree-file-view';
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


class Content extends React.Component {
    
    
    render(): JSX.Element | any {
        return (
            <div className="content">
                <Modal className="source-modal" trigger={ <Button icon="sticky note outline" content="Source"/> } size="fullscreen">
                    <Switch>
                        <Route exact path="/basic" component={ () => <TreeFileView root="src/app" items={ basic.items }/> }/>
                        <Route exact path="/basic-semantic" component={ () => <TreeFileView root="src/app" items={ basic.itemsSemantic }/> }/>
                        <Route exact path="/field-validation-sync" component={ () => <TreeFileView root="src/app" items={ sync.fieldValidationItems }/> }/>
                        <Route exact path="/global-validation-sync" component={ () => <TreeFileView root="src/app" items={ sync.globalValidationItems }/> }/>
                    </Switch>
                </Modal>
                <Divider horizontal/>
                <Switch>
                    <Route exact path="/basic" component={ basic.BasicForm }/>
                    <Route exact path="/basic-semantic" component={ basic.SemanticBasicForm }/>
                    <Route exact path="/field-validation-sync" component={ sync.FieldValidationForm }/>
                    <Route exact path="/global-validation-sync" component={ sync.GlobalValidationForm }/>
                    <Redirect to="/basic"/>
                </Switch>
            </div>
        );
    }
}

const MyApp = () => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div className="app">
                <Menu fixed="top" inverted>
                    <Dropdown item text="Basic">
                        <Dropdown.Menu>
                            <Dropdown.Item as={ NavLink } to="/basic">Without Semantic</Dropdown.Item>
                            <Dropdown.Item as={ NavLink } to="/basic-semantic">With Semantic</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Array">
                        <Dropdown.Menu>
                            <Dropdown.Item as={ NavLink } to="/array">Array Field</Dropdown.Item>
                            <Dropdown.Item as={ NavLink } to="/array-with-sub">Array With Sub Array</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Sync Validation">
                        <Dropdown.Menu>
                            <Dropdown.Item as={ NavLink } to="/field-validation-sync">By Field</Dropdown.Item>
                            <Dropdown.Item as={ NavLink } to="/global-validation-sync">Global</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                <Content/>
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