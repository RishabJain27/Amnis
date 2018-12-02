import React, { Component } from 'react';
import LecturePage from './lecturePage';

// Redux related imports: 
import { Provider } from 'react-redux';
import store from '../store';

class RolePage extends Component {
    render() {
        return(
        	<Provider store={store}>
        		<div>
          			<LecturePage/>
          		</div>
      		</Provider>



        );
    }
}

export default RolePage;