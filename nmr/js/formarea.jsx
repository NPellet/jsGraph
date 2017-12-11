
import React from 'react';
import ReactDOM from 'react-dom';

class FormArea {

	constructor() {

		this.dom = document.createElement('div');
	}
		
	setDom( dom ) {
		this.dom = dom;
	}

	getDom() {
		return this.dom;
	}

	empty() {
		ReactDOM.render( <span />, this.dom );
	}

	setForm( ReactForm ) {
		ReactDOM.render( ReactForm, this.dom );
	}

}

export default FormArea