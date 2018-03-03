import React from "react";

class FormCouplingElement extends React.Component {
	
	constructor() {

		super();
	}


	render() {

		return ( 
			<tr>
				<td>	
				
				 <select className="form-control"  value={ this.props.multiplicity } onChange={ this.props.onChange }  name="multiplicity">
				    <option value="d">Doublet</option>
				    <option value="t">Triplet</option>
				    <option value="q">Quadruplet</option>
				    <option value="quint">Quintuplet</option>
				    <option value="hex">Hexaplet</option>
				    <option value="hept">Heptaplet</option>
				    <option value="oct">Octaplet</option>
				    <option value="nona">Nonaplet</option>
				  </select>


				</td>
				<td>
					<input type="number" name="coupling" className="form-control" value={ this.props.coupling } onChange={ this.props.onChange } />
				</td>
				<td>	
					<div className="btn-group">
						<button className="btn btn-sm btn-light" type="button" onClick={ this.props.addLine }>+</button>
						<button className="btn btn-sm btn-light" type="button" onClick={ this.props.removeLine }>-</button>
					</div>
				</td>
			</tr>
		);
	}
}

export default FormCouplingElement;