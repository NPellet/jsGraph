import React from "react";

class FormCouplingElement extends React.Component {
	
	constructor() {

		super();
	}


	render() {

		return ( 
			<tr>
				<td>
					<input type="text" name="multiplicity" className="form-control" value={ this.props.multiplicity } onChange={ this.props.onChange } />
				</td>
				<td>
					<input type="number" name="coupling" className="form-control" value={ this.props.coupling } onChange={ this.props.onChange } />
				</td>
				<td>	
					<div className="btn-group">
						<button className="btn btn-sm" type="button" onClick={ this.props.addLine }>+</button>
						<button className="btn btn-sm" type="button" onClick={ this.props.removeLine }>-</button>
					</div>
				</td>
			</tr>
		);
	}
}

export default FormCouplingElement;