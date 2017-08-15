
import React from 'react';
import ReactDOM from 'react-dom';
import NMR2D from './nmr2d.jsx'
import extend from "extend";
import JcampConverter from "jcampconverter"

Promise.all( [ fetch( "nmr1.json" ), fetch( "nmr2.json" ), fetch( "molecule.svg"), fetch( "cosy.jdx" ) ] ).then( async ( data ) => {
		
	var seriesTop = [];
	var seriesLeft = [];

	var cosy = data[3];

		cosy.text().then( ( cosy ) => {

		
		//	cosy = JcampConverter.convert( cosy, {keepSpectra:true} );
		//	console.log( cosy );

			ReactDOM.render(
			  <NMR2D width="600" height="600" nmr_top={ seriesTop } nmr_left={ seriesLeft } options={ options } series={ [ { name: 'cosy', data: cosy } ] } molecule={ molecule } onChanged={ serieChanged } />,
			  document.getElementById('root')
			);

		});
	 
	for( var i = 0; i < 2; i ++ ) {

		await data[ i ].json().then( ( data ) => {

			seriesLeft.push(
				{ 	
					shift: 2,
					name: i == 0 ? "nmr1d_left_master" : "nmr1d_left_slave",
					data: data,
					color: i == 0 ? "green" : "orange",
					integrals: i == 0 ? [
						{ from: 9, to: 10, id: "aaa" }
					] : []
				}
			);

			seriesTop.push(
				{ 	
					shift: 2,
					name: i == 0 ? "nmr1d_top_master" : "nmr1d_top_slave",
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