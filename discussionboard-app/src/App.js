import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/discussionInput'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="discussion-wrapper">
        <Header />
        <TodoInput />
        </div>
        
      </div>
    );
  }
}

export default App;
