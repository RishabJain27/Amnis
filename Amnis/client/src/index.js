import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './LandingPage';
import * as serviceWorker from './serviceWorker';
import AppNavbar from './components/AppNavbar';
import { isUserLoggedIn } from './UserAuth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function NoPage ({ location }){
    return (
        <div>
            <AppNavbar />
            <h2><center style={{paddingTop:'10%'}}>404 Error: No path found for '{location.pathname}'</center></h2>
        </div>
        
    );
};

function AuthRedirect () {
    localStorage.setItem('popup', true);
    return (
        <Redirect to={{
            pathname: "/",
            state: { redirected: true }
        }} />
    );
};
    

const RoutedApp = () => (
    <BrowserRouter>
        <Switch> {/*matches exactly one route from below*/}
            <Route exact path="/" component={LandingPage} />
            <Route path="/main" render={() => (
                !isUserLoggedIn() ? (<AuthRedirect/>) : (<App />)
            )} />
            <Route component={NoPage} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
