import {
  EventMixin
} from './graph.mixin.event.js';

let ExtendedEventMixin = ( manglingName ) => {

  return {
    __proto__: EventMixin,

    trigger( eventName, ...args ) {

      super.trigger( eventName, ...args );

      if ( this.graph ) {
        this.graph.trigger( manglingName + "." + eventName, ...args );
      }
    },

    emit( eventName, ...args ) {
      this.trigger( eventName, ...args );
    }
  }
};

export default ( Obj, manglingName = "__" ) => {
  Object.assign( Obj.prototype, ExtendedEventMixin( manglingName ) );
};