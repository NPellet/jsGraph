import * as util from '../graph.util'

var aggregatorWorker;
var queue = {};

var workerUrl = URL.createObjectURL( new Blob(
  [ " ( " +
    function() {
      onmessage = function( e ) {

        const data = e.data.data,
          numPoints = e.data.numPoints,
          max = e.data.max,
          min = e.data.min,
          dataPerSlot = numPoints / ( max - min ),
          l = data.length;

        let i = 0;
        let k = -4;
        let slots = [];
        let dataAggregated = [];

        for ( ; i < l; i++ ) {

          // dataPerSlot: 1 / 1000 ( compression by 1'000 )
          slotNumber = Math.floor( ( data[ i ][ 0 ] - min ) * dataPerSlot );

          if ( slots[ k ] !== slotNumber ) {
            k += 4;
            slots[ k ] = slotNumber;

            let slotX = ( slotNumber + 0.5 ) / dataPerSlot;

            dataAggregated[ k ] = [ slotX, data[ i ][ 1 ] ];
            dataAggregated[ k + 1 ] = [ slotX, data[ i ][ 1 ] ];
            dataAggregated[ k + 2 ] = [ slotX, data[ i ][ 1 ] ];
            dataAggregated[ k + 3 ] = [ slotX, data[ i ][ 1 ] ];
          }
          dataAggregated[ k + 1 ][ 1 ] = Math.min( data[ i ][ 1 ], dataAggregated[ k + 1 ][ 1 ] );
          dataAggregated[ k + 2 ][ 1 ] = Math.max( data[ i ][ 1 ], dataAggregated[ k + 2 ][ 1 ] );
          dataAggregated[ k + 3 ][ 1 ] = data[ i ][ 1 ];

        }

        postMessage( {
          numPoints: numPoints,
          data: dataAggregated,
          _queueId: e.data._queueId
        } );
      };

    }.toString() + ")()"
  ]

  , {
    type: 'application/javascript'
  } ) );

aggregatorWorker = new Worker( workerUrl );

aggregatorWorker.onmessage = function( e ) {
  var id = e.data._queueId;
  delete e.data._queueId;

  queue[ id ]( e.data );
  delete queue[ id ];
}

export default function( toOptimize ) {

  var requestId = util.guid();
  toOptimize._queueId = requestId;

  var prom = new Promise( ( resolver ) => {
    queue[ requestId ] = resolver;
  } );

  aggregatorWorker.postMessage( toOptimize );
  return prom;
}