import React, { Component } from 'react';

class Counter extends Component {
    state = {
        value: this.props.counter.value
    };

    handleIncrement = () => {
        this.setState({ value: this.state.value +1 });
    };

    handleDecrement = () => {
        this.setState({ value: this.state.value -1 });
    };

    render() { 
        return (
        <div> 
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button 
                    onClick={ this.handleIncrement}
                    className="btn btn-secondary btn-sm"
                >
                    Upvote
                    </button>
                    <button 
                    onClick={ this.handleDecrement}
                    className="btn btn-danger btn-sm m-2" 
                    >
                    Downvote
                </button>
            </div> 
        );
    }

getBadgeClasses(){
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ?  "warning" : "primary";
    return classes;
}

formatCount(){
    const{value} = this.state;
    return value === 0 ? 'Zero' : value;
}
}
 
export default Counter;