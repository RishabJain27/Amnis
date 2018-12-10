// Core file of the project, includes all the routing and global store
// functionalities required by each component.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Component and function imports
import App from './App';
import LandingPage from './LandingPage';
import * as serviceWorker from './serviceWorker';
import AppNavbar from './components/AppNavbar';
import LecturePage from './LecturePage';
import LectureView from './LectureView';
import { isUserLoggedIn } from './UserAuth';

// Redux related imports
import { Provider } from 'react-redux';
import store from './store';

// FontAwesome icon library imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faArrowUp, faArrowDown, faVideo, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faCircle, faArrowUp, faArrowDown, faVideo, faPlus, faMinus, faTrash);

// The following function returns a JSX component which will server as a 404 page
function NoPage ({ location }) {
    return (
        <div>
            <AppNavbar />
            <h2>
                <center style={{paddingTop:'10%'}}>
                    404 Error: No path found for '{location.pathname}'. Click <a href="/">here</a> to go back.
                </center>
            </h2>
        </div>
    );
};

// The following function checks user authentication before allowing the user to continue
// to the main site. If user is not logged in, this returns the user to the main page.
function AuthRedirect () {
    localStorage.setItem('popup', true); // Sign Up popup will appear when redirected
    return (
        <Redirect to={{
            pathname: "/",
            state: { redirected: true }
        }} />
    );
};
    
// This function serves the overall routing of the entire site, as well as
// wraps everything with a Redux store to allow for global state
const RoutedApp = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch> {/*matches exactly one route from below*/}
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/lectures" render={({ history }) => (
                    !isUserLoggedIn() ? (<AuthRedirect />) : (<LecturePage history={history} />)
                )} />
                <Route exact path="/lecture/:id" render={({ history, match }) => (
                    !isUserLoggedIn() ? (<AuthRedirect />) : (<LectureView match={match} history={history} />)
                )} />
                <Route component={NoPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
