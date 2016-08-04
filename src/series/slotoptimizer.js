import * as util from '../graph.util'

var slotWorker;
var queue = {};

function createWorker() {

  var workerUrl = URL.createObjectURL( new Blob(
    [ " ( " +
      function() {
        onmessage = function( e ) {

          var data = e.data.data,
            slotNb = e.data.slotNumber,
            slot = e.data.slot,
            flip = e.data.flip,
            max = e.data.max,
            min = e.data.min,
            slotNumber,
            dataPerSlot = slot / ( max - min );

          var slotsData = [];

          for ( var j = 0, k = data.length; j < k; j++ ) {

            for ( var m = 0, n = data[ j ].length; m < n; m += 2 ) {

              slotNumber = Math.floor( ( data[ j ][ m ] - min ) * dataPerSlot );

              slotsData[ slotNumber ] = slotsData[ slotNumber ] || {
                min: data[ j ][ m + 1 ],
                max: data[ j ][ m + 1 ],
                start: data[ j ][ m + 1 ],
                stop: false,
                x: data[ j ][ m ]
              };

              slotsData[ slotNumber ].stop = data[ j ][ m + 1 ];
              slotsData[ slotNumber ].min = Math.min( data[ j ][ m + 1 ], slotsData[ slotNumber ].min );
              slotsData[ slotNumber ].max = Math.max( data[ j ][ m + 1 ], slotsData[ slotNumber ].max );

            }
          }

          postMessage( {
            slotNumber: slotNb,
            slot: slot,
            data: slotsData,
            _queueId: e.data._queueId
          } );
        };

      }.toString() + ")()"
    ]

    , {
      type: 'application/javascript'
    } ) );

  slotWorker = new Worker( workerUrl );

  slotWorker.onmessage = function( e ) {
    var id = e.data._queueId;
    delete e.data._queueId;
    queue[ id ].resolve( e.data.data );
    delete queue[ id ];
  }
}

export default function( toOptimize ) {

  if ( !slotWorker ) {
    createWorker();
  }

  var requestId = util.guid();
  toOptimize._queueId = requestId;
  var resolve;
  var prom = new Promise( function( _resolve ) {
    resolve = _resolve;
  } );
  queue[ requestId ] = {
    promise: prom,
    resolve: resolve
  };

  slotWorker.postMessage( toOptimize );
  return queue[ requestId ].promise;
}