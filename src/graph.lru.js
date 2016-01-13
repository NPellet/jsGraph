define( [], function() {

    var memory = {},
        memoryHead = {},
        memoryCount = {},
        memoryLimit = {};

    function getFromMemory(store, index) {
        var obj, head;
        if (memory[store] && memory[store][index]) {

            head = memoryHead[store];

            obj = memory[store][index];
            obj.prev = head;
            obj.next = head.next;
            head.next.prev = obj;
            head.next = obj;

            memoryHead[store] = obj;
            return obj.data;
        }
    }

    function storeInMemory(store, index, data) {
        var toStore, toDelete, head;
        if (memory[store] && memoryCount[store] && memoryLimit[store]) {
            head = memoryHead[store];
            if (memory[store][index])
                return getFromMemory(store, index);

            toStore = {data: {data: data, timeout: Date.now()}};

            if (typeof head == 'undefined') {
                toStore.prev = toStore;
                toStore.next = toStore;
            } else {
                toStore.prev = head.prev;
                toStore.next = head.next;
                head.next.prev = toStore;
                head.next = toStore;
            }

            memoryHead[store] = toStore;
            memory[store][index] = toStore;
            memoryCount[store]++;

            // Remove oldest one
            if (memoryCount[store] > memoryLimit[store] && head) {
                toDelete = head.next;
                head.next.next.prev = head;
                head.next = head.next.next;
                toDelete.next.next = undefined;
                toDelete.next.prev = undefined;
                memoryCount[store]--;
            }

            return data;
        }
    }


    return {

        create: function (store, limitMemory) {
            createStoreMemory(store, limitMemory);
        },

        get: function (store, index) {
            var result;
            if ((result = getFromMemory(store, index)) != undefined) {
                return result;
            }

        },

        store: function (store, index, value) {
            storeInMemory(store, index, value);
            return value;
        },

        empty: function( store ) {
            emptyMemory( store );
        },

        exists: function( store ) {
            return ( memory[ store ] );
        }
    }
} );
