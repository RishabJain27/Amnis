//Creates component to display Tags
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';



class ButtonTag extends Component {

	constructor(props){
		super(props);

		this.state = {
					 };
	}



    render() {    

    	axios
        	.get('http://localhost:5000/api/questions')
        	.then(res =>  

        		{switch(res.data.length) {
        			case 5: this.setState({ text5: (String(res.data[4].content))}); 
    	    		case 4: this.setState({ text4: (String(res.data[3].content))}); 
    	    		case 3:this.setState({ text3: (String(res.data[2].content))}); 
    	    		case 2:this.setState({ text2: (String(res.data[1].content))}); 
    	    		case 1: this.setState({ text1: (String(res.data[0].content))}); 
	        	}
        	});

        	return(
        	<div>	
    			{this.state.text1 &&	<button> {this.state.text1}</button>} &nbsp;
    			{this.state.text2 && <button> {this.state.text2}</button>} &nbsp;
    			{this.state.text3 && <button> {this.state.text3}</button>} &nbsp;
    			{this.state.text4 && <button> {this.state.text4}</button>} &nbsp;
    			{this.state.text5 &&<button> {this.state.text5}</button>}
			</div>

			);			

	}

	

}
export default ButtonTag;