import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './LandingPage';
import * as serviceWorker from './serviceWorker';
import AppNavbar from './components/AppNavbar';
import LecturePage from './LecturePage';
import LectureView from './LectureView';
import { isUserLoggedIn } from './UserAuth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faArrowUp, faArrowDown, faVideo, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faCircle, faArrowUp, faArrowDown, faVideo, faPlus, faMinus, faTrash);

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
    <Provider store={store}>
        <BrowserRouter>
            <Switch> {/*matches exactly one route from below*/}
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/lectures" render={({history}) => (
                    !isUserLoggedIn() ? (<AuthRedirect />) : (<LecturePage history={history} />)
                )} />
                <Route exact path="/lecture/:id" render={({history, match}) => (
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
