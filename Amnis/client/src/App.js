import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import QuestionList from './components/QuestionList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Hello World</h1>
          <AppNavbar />
          <Container>
            <ItemModal />
            <QuestionList />
          </Container>
          
        </div>
      </Provider>
    );
  }
}

export default App;
