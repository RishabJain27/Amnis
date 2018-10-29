import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/discussionInput';
import Example from './components/youtubeVideo';

class App extends Component {
  render() {
    return (
      <div className="App">
			<div className="video-wrapper">
				<Example />
			</div>
			<div className="discussion-wrapper">
				<Header />
				<TodoInput />
			</div>
        
      </div>
    );
  }
}

export default App;
