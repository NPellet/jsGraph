import {
  EventMixin,
  trigger
} from './graph.mixin.event.js';
let ExtendedEventMixin = (manglingName) => {

  return Object.assign({}, EventMixin, {

    trigger(eventName, ...args) {

      trigger.call(this, eventName, ...args);

      if (this.graph) {
        this.graph.trigger(manglingName + "." + eventName, ...args);
      }
      return this;
    },

    emit(eventName, ...args) {
      return this.trigger(eventName, ...args);
    }
  });
};

export default (Obj, manglingName = "__") => {

  Object.assign(Obj.prototype, ExtendedEventMixin(manglingName));
};