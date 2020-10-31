import { EventMixin } from './graph.mixin.event.js';

let ExtendedEventMixin = {
    __proto__: EventMixin,

    trigger(eventName, ...args) {

        super.trigger(eventName, ...args);

        if (this.graph) {
            this.graph.trigger(eventName, ...args);
        }
    },

    emit(eventName, ...args) {
        this.trigger(eventName, ...args);
    }
};

export default (Obj) => {
    Object.assign(Obj.prototype, ExtendedEventMixin);
};