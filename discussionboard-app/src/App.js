import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/discussionInput';
import Example from './components/youtubeVideo';
import TodoItem from './components/todoItem';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            todos: [
                {id: 0, text:"Make dinner tonight!"},
                {id: 1, text:"Make dinner tomorrow!"},
                {id: 2, text:"Make dinner never!"}
            ],
            nextId:3
        }
        
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo= this.removeTodo.bind(this);
    }
    
    addTodo(todoText){
        //console.log("Todo added; ", todoText);
        let todos = this.state.todos.slice();
        todos.push({id:this.state.nextId, text: todoText});
        this.setState({
            todos: todos,
            nextId: ++this.state.nextId
        });
    }
    
    removeTodo(id){
        console.log("removing: ", id);
    }
    
  render() {
    return (
      <div className="App">
			<div className="video-wrapper">
				<Example />
			</div>
			<div className="discussion-wrapper">
				<Header />
				<TodoInput todoText="" addTodo={this.addTodo}/>
				<ul>
					{
						this.state.todos.map((todo) => {
						return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo}/>
						})

}
					}
				</ul>
			</div>
      </div>
    );
  }
}

export default App;
