var dataAggregator;

if (
  typeof URL === 'undefined' ||
  typeof URL.createObjectURL === 'undefined' ||
  typeof Blob === 'undefined' ||
  typeof Worker === 'undefined'
) {
  dataAggregator = () => {};
} else {
  var aggregatorWorker;
  var queue = {};

  let string = function() {

    onmessage = function( e ) {

      const data = e.data.data, // The initial data
        maxX = e.data.maxX,
        minX = e.data.minX,
        maxY = e.data.maxY,
        minY = e.data.minY,
        direction = e.data.direction;

      let numPoints = e.data.numPoints; // Total number of points in the slot
      let l = data.length; // Number of data in the original buffer
      let i = 0;
      let k = -4;
      let slots = [];
      let dataAggregatedX = [];
      let dataAggregatedY = [];
      let aggregationSum = [];
      let getX;
      let slotNumber;
      let lastAggregationX;
      let lastAggregation;
      let lastAggregationSum;
      let newAggregation;
      let newAggregationX;

      if ( e.data.xdata ) {

        getX = function getX( index ) {
          return e.data.xdata[ index ];
        };
      } else {
        getX = function getX( index ) {
          return index * e.data.xScale + e.data.xOffset;
        };
      }

      let aggregations = {};

      // Direction x
      if ( direction == 'x' ) {
        const dataPerSlot = numPoints / ( maxX - minX ); // Computed number of aggregation per slot

        for ( ; i < l; i++ ) {

          // dataPerSlot: 1 / 1000 ( compression by 1'000 )
          //console.log( dataPerSlot, getX( i ) );
          slotNumber = Math.floor( ( getX( i ) - minX ) * dataPerSlot );

          if ( slots[ k ] !== slotNumber ) {
            k += 4;
            slots[ k ] = slotNumber;

            let slotX = ( slotNumber + 0.5 ) / dataPerSlot + minX;

            dataAggregatedX[ k ] = slotX;
            dataAggregatedX[ k + 1 ] = slotX;
            dataAggregatedX[ k + 2 ] = slotX;
            dataAggregatedX[ k + 3 ] = slotX;

            dataAggregatedY[ k ] = data[ i ];
            dataAggregatedY[ k + 1 ] = data[ i ];
            dataAggregatedY[ k + 2 ] = data[ i ];
            dataAggregatedY[ k + 3 ] = data[ i ];
            aggregationSum[ k ] = 0;
          }

          dataAggregatedY[ k + 1 ] = Math.min( data[ i ], dataAggregatedY[ k + 1 ] );
          dataAggregatedY[ k + 2 ] = Math.max( data[ i ], dataAggregatedY[ k + 2 ] );
          dataAggregatedY[ k + 3 ] = data[ i ];
          aggregationSum[ k ] += data[ i ];
        }

      } else { // y

        const dataPerSlot = numPoints / ( maxY - minY ); // Computed number of aggregation per slot

        for ( ; i < l; i++ ) {

          // dataPerSlot: 1 / 1000 ( compression by 1'000 )
          //console.log( dataPerSlot, getX( i ) );
          slotNumber = Math.floor( ( data[ i ] - minY ) * dataPerSlot );

          if ( slots[ k ] !== slotNumber ) {
            k += 4;
            slots[ k ] = slotNumber;

            let slotY = ( slotNumber + 0.5 ) / dataPerSlot + minY;

            dataAggregatedY[ k ] = slotY;
            dataAggregatedY[ k + 1 ] = slotY;
            dataAggregatedY[ k + 2 ] = slotY;
            dataAggregatedY[ k + 3 ] = slotY;

            dataAggregatedX[ k ] = data[ i ];
            dataAggregatedX[ k + 1 ] = data[ i ];
            dataAggregatedX[ k + 2 ] = data[ i ];
            dataAggregatedX[ k + 3 ] = data[ i ];
            aggregationSum[ k ] = 0;

          }
          dataAggregatedX[ k + 1 ] = Math.min( getX( i ), dataAggregatedX[ k + 1 ] );
          dataAggregatedX[ k + 2 ] = Math.max( getX( i ), dataAggregatedX[ k + 2 ] );
          dataAggregatedX[ k + 3 ] = getX( i );
          aggregationSum[ k ] += getX( i );
        }

      }

      aggregations[ numPoints ] = {
        x: dataAggregatedX,
        y: dataAggregatedY,
        sums: aggregationSum
      };

      lastAggregation = dataAggregatedY;
      lastAggregationX = dataAggregatedX;
      lastAggregationSum = aggregationSum;

      while ( numPoints > 256 ) {

        numPoints /= 2;

        newAggregation = [];
        newAggregationX = [];

        k = 0;

        if ( direction == 'x' ) {

          for ( i = 0, l = lastAggregation.length - 8; i < l; i += 8 ) {

            newAggregationX[ k ] = ( lastAggregationX[ i ] + lastAggregationX[ i + 4 ] ) / 2;
            newAggregationX[ k + 1 ] = newAggregationX[ k ];
            newAggregationX[ k + 2 ] = newAggregationX[ k ];
            newAggregationX[ k + 3 ] = newAggregationX[ k ];

            newAggregation[ k ] = lastAggregation[ i ];
            newAggregation[ k + 1 ] = Math.min( lastAggregation[ i + 1 ], lastAggregation[ i + 5 ] );
            newAggregation[ k + 2 ] = Math.max( lastAggregation[ i + 2 ], lastAggregation[ i + 6 ] );
            newAggregation[ k + 3 ] = lastAggregation[ i + 7 ];

            aggregationSum[ k ] = ( lastAggregationSum[ i ] + lastAggregationSum[ i + 4 ] ) / 2;

            k += 4;
          }
        } else {

          for ( i = 0, l = lastAggregation.length - 8; i < l; i += 8 ) {

            newAggregation[ k ] = ( lastAggregation[ i ] + lastAggregation[ i + 4 ] ) / 2;
            newAggregation[ k + 1 ] = newAggregation[ k ];
            newAggregation[ k + 2 ] = newAggregation[ k ];
            newAggregation[ k + 3 ] = newAggregation[ k ];

            newAggregationX[ k ] = lastAggregationX[ i ];
            newAggregationX[ k + 1 ] = Math.min( lastAggregationX[ i + 1 ], lastAggregationX[ i + 5 ] );
            newAggregationX[ k + 2 ] = Math.max( lastAggregationX[ i + 2 ], lastAggregationX[ i + 6 ] );
            newAggregationX[ k + 3 ] = lastAggregationX[ i + 7 ];

            aggregationSum[ k ] = ( lastAggregationSum[ i ] + lastAggregationSum[ i + 4 ] ) / 2;

            k += 4;
          }
        }

        aggregations[ numPoints ] = {
          x: newAggregationX,
          y: newAggregation,
          sums: aggregationSum
        };

        lastAggregation = newAggregation;
        lastAggregationX = newAggregationX;
        lastAggregationSum = aggregationSum;

        aggregationSum = [];
      }

      postMessage( {
        aggregates: aggregations,
        _queueId: e.data._queueId
      } );
    };

  }.toString();

  string = string.replace( /^\s*function\s*\(\s*\)\s*\{/, '' );
  string = string.replace( /}\s*$/, '' );
  /*
  if ( typeof URL == "undefined" ) {
    module.exports = function() {};

  } else {
  */

  var workerUrl = URL.createObjectURL( new Blob(
    [ string ], {
      type: 'application/javascript'
    } ) );

  aggregatorWorker = new Worker( workerUrl );

  aggregatorWorker.onmessage = function( e ) {

    var id = e.data._queueId;
    delete e.data._queueId;
    queue[ id ]( e.data );
    delete queue[ id ];
  };

  dataAggregator = function( toOptimize ) {

    var requestId = Date.now();
    toOptimize._queueId = requestId;

    var prom = new Promise( ( resolver ) => {
      queue[ requestId ] = resolver;
    } );

    aggregatorWorker.postMessage( toOptimize );
    return prom;
  };

}

export default dataAggregator;