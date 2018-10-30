import React from 'react';

export default class TodoItem extends React.Component{
    constructor(props){
        super(props);
    }
    
    removeTodo(id) {
        this.props.removeTodo(id);
    }
    
    render() {
        return (
            <div className="todo-wrapper">
				<div className="vote circle">
					<div className="increment up"></div>
					<div className="count">0</div>
				</div>
                <button className="removeTodo" onClick={(e) => this.removeTodo(this.props.id)}>upvote</button>{this.props.todo.text}
            </div>
        )
    }
    

}

