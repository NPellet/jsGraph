import { fromPairs } from "lodash";

type Constructor<T> = new (...args: any[] ) => T

function EventMixin<TBase extends Constructor<any>>( Base: TBase ) {

  return class EventMixing extends Base {

    on(eventName: string, handler: Function) {

      if (!this.__eventHandlers) {
        this.__eventHandlers = {};
      }

      if (!this.__eventHandlers[eventName]) {
        this.__eventHandlers[eventName] = [];
      }

      this.__eventHandlers[eventName].push(handler);
      return this;
    }

    off(eventName: string, handler: Function) {
      let handlers = this.__eventHandlers?.[eventName];
      if (!handlers) {
        return;
      }

      if (!handler) {
        handlers = []; // Reset the array and let the GC recycle all the handlers
      } else {

        for (let i = 0, l = handlers.length; i < l; i++) {
          if (handlers[i] == handler) {
            handlers.splice(i--, 1);
          }
        }
      }
      return this;
    }

    onAll(handler: Function) {
      return this.on('__all', handler);
    }

    ofAll(handler: Function) {
      return this.off('__all', handler);
    }

    trigger(eventName: string, ...params: any[]) {

      if (this.__eventHandlers?.[eventName]) {
        this.__eventHandlers[eventName].forEach(handler => handler.apply(this, params));
      }
    
      const allHandlers = this.__eventHandlers?.__all;
      if (allHandlers) {
        allHandlers.forEach(handler => handler.apply(this, [eventName, ...params]));
      }

      return this;
    }

    emit(eventName: string, ...params: any[]) {
      return this.trigger(eventName, ...Array.from( params ) );
    }
}
}

class B {}
const EventEmitter = EventMixin( B );

export default EventMixin;
export { EventEmitter }