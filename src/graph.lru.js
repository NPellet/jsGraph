

var memory = {},
  memoryHead = {},
  memoryCount = {},
  memoryLimit = {};

function createStoreMemory( store, limit ) {
  limit = limit || 50;
  if ( !memory[ store ] ) {
    memory[ store ] = {};
    memoryCount[ store ] = 0;
  }

  memoryLimit[ store ] = limit;
}

function getFromMemory( store, index ) {
  var obj, head;

  if ( memory[ store ] && memory[ store ][ index ] ) {

    head = memoryHead[ store ];

    obj = memory[ store ][ index ];
    obj.prev = head;
    obj.next = head.next;
    head.next.prev = obj;
    head.next = obj;

    memoryHead[ store ] = obj;
    return obj.data;
  }
}

function storeInMemory( store, index, data ) {

  var toStore, toDelete, head;
  if ( memory[ store ] && memoryCount[ store ] !== undefined && memoryLimit[ store ] ) {
    head = memoryHead[ store ];

    if ( memory[ store ][ index ] ) {

      getFromMemory( store, index );
      memory[ store ][ index ].data.data = data;
      memory[ store ][ index ].data.timeout = Date.now();

    } else {

      toStore = {
        data: {
          data: data,
          timeout: Date.now()
        }
      };

      if ( typeof head == 'undefined' ) {
        toStore.prev = toStore;
        toStore.next = toStore;
      } else {
        toStore.prev = head.prev;
        toStore.next = head.next;
        head.next.prev = toStore;
        head.next = toStore;
      }

      memoryHead[ store ] = toStore;
      memory[ store ][ index ] = toStore;
      memoryCount[ store ]++;
    }

    // Remove oldest one
    if ( memoryCount[ store ] > memoryLimit[ store ] && head ) {
      toDelete = head.next;
      head.next.next.prev = head;
      head.next = head.next.next;
      toDelete.next.next = undefined;
      toDelete.next.prev = undefined;
      memoryCount[ store ]--;
    }

    return data;
  }
}

export create function( store, limitMemory ) {
  createStoreMemory( store, limitMemory );
};

export get function( store, index ) {
  var result;
  if ( ( result = getFromMemory( store, index ) ) != undefined ) {
    return result;
  }
}

export store function( store, index, value ) {
  storeInMemory( store, index, value );
  return value;
};

export empty function( store ) {
  emptyMemory( store );
};

export exists function( store ) {
  return ( memory[ store ] );
}

