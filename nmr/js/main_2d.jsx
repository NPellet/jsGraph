
import React from 'react';
import ReactDOM from 'react-dom';
import NMR2D from './nmr2d.jsx'
import extend from "extend";
import JcampConverter from "jcampconverter"

Promise.all( [ fetch( "nmr1.json" ), fetch( "nmr2.json" ), fetch( "molecule.svg"), fetch( "cosy.jdx" ) ] ).then( async ( data ) => {
		
	var series = [];

	var cosy = data[3];
console.log( cosy );
		cosy.text().then( ( cosy ) => {

		
			cosy = JcampConverter.convert( cosy, {keepSpectra:true} );
			console.log( cosy );

			ReactDOM.render(
			  <NMR2D width="600" height="600" nmr_top={ series } nrm_left={ series } options={ options } series={ [ { name: 'cosy', data: cosy } ] } molecule={ molecule } onChanged={ serieChanged } />,
			  document.getElementById('root')
			);

		});
	 
	for( var i = 0; i < 2; i ++ ) {

		await data[ i ].json().then( ( data ) => {

			series.push(
				{ 	
					shift: 2,
					name: i == 0 ? "master" : "slave",
					data: data,
					color: i == 0 ? "green" : "orange",
					integrals: i == 0 ? [
						{ from: 9, to: 10, id: "aaa" }
					] : []
				}
			);
		} );
	}

	let molecule = await data[ 2 ].text().then( ( data ) => {
		return data;
	});

	const textarea = document.getElementById("text");
	function serieChanged( series ) {

	}

	const options = {
		minThresholdPeakToPeak: 0.01
	};



	
} );