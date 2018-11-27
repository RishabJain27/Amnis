import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './LandingPage';
import * as serviceWorker from './serviceWorker';
import RolePage from './components/RolePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const RoutedApp = () => (
    <BrowserRouter>
        <Switch> {/*matches exactly one route from below*/}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/main" component={App} />
            <Route exact path="/roles" component={RolePage} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
