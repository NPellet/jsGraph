import * as util from '../graph.util'

var aggregatorWorker;
var queue = {};

var workerUrl = URL.createObjectURL( new Blob(
  [ " ( " +
    function() {
      onmessage = function( e ) {

        const data = e.data.data, // The initial data
          numPoints = e.data.numPoints, // Total number of points in the slot
          max = e.data.max, // Max X
          min = e.data.min, // Min Y
          dataPerSlot = numPoints / ( max - min ), // Computer number of aggregation per slot
          l = data.length; // Number of data in the original buffer

        let i = 0;
        let k = -4;
        let slots = [];
        let dataAggregatedX = [];
        let dataAggregatedY = [];
        let getX;

        if ( e.data.xdata ) {

          getX = function getX( index ) {
            return e.data.xdata[  index ];
          }
        } else {
          getX = function getX( index ) {
            return index * e.data.xScale + e.data.xOffset;
          }

        }

        for ( ; i < l; i++ ) {

          // dataPerSlot: 1 / 1000 ( compression by 1'000 )
          //console.log( dataPerSlot, getX( i ) );
          slotNumber = Math.floor( ( getX( i ) - min ) * dataPerSlot );

          if ( slots[ k ] !== slotNumber ) {
            k += 4;
            slots[ k ] = slotNumber;

            let slotX = ( slotNumber + 0.5 ) / dataPerSlot;

            dataAggregatedX[ k ] = slotX;
            dataAggregatedX[ k + 1 ] = slotX;
            dataAggregatedX[ k + 2 ] = slotX;
            dataAggregatedX[ k + 3 ] = slotX;

            dataAggregatedY[ k ] = data[ i ];
            dataAggregatedY[ k + 1 ] = data[ i ];
            dataAggregatedY[ k + 2 ] = data[ i ];
            dataAggregatedY[ k + 3 ] = data[ i ];
          }
          dataAggregatedY[ k + 1 ] = Math.min( data[ i ], dataAggregatedY[ k + 1 ] );
          dataAggregatedY[ k + 2 ] = Math.max( data[ i ], dataAggregatedY[ k + 2 ] );
          dataAggregatedY[ k + 3 ] = data[ i ];

        }

        postMessage( {
          numPoints: numPoints,
          data: {
            x: dataAggregatedX,
            y: dataAggregatedY
          },
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