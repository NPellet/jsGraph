
import React from 'react';
import ReactDOM from 'react-dom';
import NMR1D from './nmr1d.jsx'
import extend from "extend";

Promise.all( [ fetch( "nmr1.json" ), fetch( "nmr2.json" ), fetch( "molecule.svg") ] ).then( async ( data ) => {
		
	var series = [];

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

		var seriescopy = extend( true, [], series );
		seriescopy = seriescopy.map( ( serie ) => {
			
			serie.data = "[...]";
			return serie;
		});

		textarea.innerHTML = JSON.stringify( seriescopy, undefined, "\t" )
	}

	const options = {
		minThresholdPeakToPeak: 0.01,
		toolbar: true,
		legend: true
	};

	textarea.addEventListener("change", function() {

		var json = JSON.parse( textarea.value );
		json = json.map( ( serie, index  ) => {

			serie.data = data[ index ];
			return serie;
		});

		ReactDOM.render(
		  <NMR1D width="800" height="600" options={ options } molecule={ molecule } series={ json } onChanged={ serieChanged }></NMR1D>,
		  document.getElementById('root')
		);

	})


	ReactDOM.render(
	  <NMR1D width="800" height="600" options={ options } series={ series } molecule={ molecule } onChanged={ serieChanged }></NMR1D>,
	  document.getElementById('root')
	);
	
} );