import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/discussionInput';
import Example from './components/youtubeVideo';
import TodoItem from './components/todoItem';

const $ = window.$;
class App extends Component {
    constructor(props){
        super(props);
        
        /*this.state = {
            todos: [
                {id: 0, text:"Make dinner tonight!"},
                {id: 1, text:"Make dinner tomorrow!"},
                {id: 2, text:"Make dinner never!"}
            ],
            nextId:3
        }*/

        this.state = {
            todos: [
            ],
        }
        
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo= this.removeTodo.bind(this);
    }

    /*function questionDB(){
         var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://api.mlab.com/api/1/databases/amnis_115/collections/questions?apiKey=VDpOsnOX-5duzNEouBEEei-or-cK4deF", false ); // false for synchronous request
        xmlHttp.send( null );
        var response = xmlHttp.responseText;
        var jsonResp = JSON.parse(response);

        for(var i=0; i<jsonResp.length;i++){
            console.log(jsonResp[i].content);
        }

    }*/

    addTodo(todoText){
        //console.log("Todo added; ", todoText);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://api.mlab.com/api/1/databases/amnis_115/collections/questions?apiKey=VDpOsnOX-5duzNEouBEEei-or-cK4deF", false ); // false for synchronous request
        xmlHttp.send( null );
        var response = xmlHttp.responseText;
        var jsonResp = JSON.parse(response);

        for(var i=0; i<jsonResp.length;i++){
            console.log(jsonResp[i].content);
            let todos = this.state.todos;
            todos.push({id:this.state.nextId, text: jsonResp[i].content});
            this.setState({
                todos: todos,
                nextId: ++this.state.nextId
            });
        }

    }
    
    removeTodo(id){
        console.log("removing: ", id);
        
        $.ajax( { url: "https://api.mlab.com/api/1/databases/amnis_115/collections/questions?apiKey=VDpOsnOX-5duzNEouBEEei-or-cK4deF",
           data: JSON.stringify( { "content" : "*upvoting*", "score" : 1 } ),
           type: "POST",
           contentType: "application/json" } );
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
				</ul>
			</div>
      </div>
    );
  }
}

export default App;
