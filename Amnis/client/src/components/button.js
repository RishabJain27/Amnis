//Creates component to display Tags
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';



class ButtonTag extends Component {

	constructor(props){
		super(props);

		this.openInNewTab1 = this.openInNewTab1.bind(this);
		this.openInNewTab2 = this.openInNewTab2.bind(this);
		this.openInNewTab3 = this.openInNewTab3.bind(this);
		this.openInNewTab4 = this.openInNewTab4.bind(this);
		this.openInNewTab5 = this.openInNewTab5.bind(this);
		this.state = {};
	}


  openInNewTab1() {
  	if(this.state.text1 == null){
  		return;
  	}
  	console.log(this.state.text1);
  	var url = "http://wikipedia.org/wiki/" + this.state.text1;
    //window.location.href = URL;
  	var win = window.open(url, '_blank');

  	win.focus();
  }

  openInNewTab2() {
  	if(this.state.text2 == null){
  		return;
  	}
  	var url = "http://wikipedia.org/wiki/" + "Mathematics";
    //window.location.href = URL;
  	var win = window.open(url, '_blank');
  	win.focus();
  }

  openInNewTab3() {
  	if(this.state.text3 == null){
  		return;
  	}
  	var url = "http://wikipedia.org/wiki/" + "Mathematics";
    //window.location.href = URL;
  	var win = window.open(url, '_blank');
  	win.focus();
  }


  openInNewTab4() {
  	if(this.state.text4 == null){
  		return;
  	}
  	var url = "http://wikipedia.org/wiki/" + "Mathematics";
    //window.location.href = URL;
  	var win = window.open(url, '_blank');
  	win.focus();
  }

  openInNewTab5() {
  	if(this.state.text5 == null){
  		return;
  	}
  	var url = "http://wikipedia.org/wiki/" + "Mathematics";
    //window.location.href = URL;
  	var win = window.open(url, '_blank');
  	win.focus();
  }

  componentDidMount() {
  	    	axios
        	.get('http://localhost:5000/api/questions')
        	.then(res =>  

        		{switch(res.data.length) {
        			case 5: this.setState({ text5: (String(res.data[4].content))}); 
    	    		case 4: this.setState({ text4: (String(res.data[3].content))}); 
    	    		case 3:this.setState({ text3: (String(res.data[2].content))}); 
    	    		case 2:this.setState({ text2: (String(res.data[1].content))}); 
    	    		case 1: this.setState({ text1: (String(res.data[0].content))});
    	    		console.log("in render"); 
	        	}
        	});
  }

    render() {    

        	return(
        	<div>	
    			{this.state.text1 && <button onClick={this.openInNewTab1}> {this.state.text1}</button>} &nbsp;
    			{this.state.text2 && <button onClick={this.openInNewTab2}> {this.state.text2}</button>} &nbsp;
    			{this.state.text3 && <button onClick={this.openInNewTab3}> {this.state.text3}</button>} &nbsp;
    			{this.state.text4 && <button onClick={this.openInNewTab4}> {this.state.text4}</button>} &nbsp;
    			{this.state.text5 &&<button onClick={this.openInNewTab5}> {this.state.text5}</button>}
			</div>

			);			

	}	

}
export default ButtonTag;