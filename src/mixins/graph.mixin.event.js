const EventMixin = {

  on(eventName, handler) {

    if (!this.__eventHandlers) {
      this.__eventHandlers = {};
    }

    if (!this.__eventHandlers[eventName]) {
      this.__eventHandlers[eventName] = [];
    }

    this.__eventHandlers[eventName].push(handler);
  },

  off(eventName, handler) {
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
  },

  onAll(handler) {
    this.on('__all', handler);
  },

  ofAll(handler) {
    this.off('__all', handler);
  },

  trigger(eventName, ...params) {
    if (this.__eventHandlers?.[eventName]) {
      this.__eventHandlers[eventName].forEach(handler => handler.apply(this, params));
    }

    const allHandlers = this.__eventHandlers?.__all;
    if (allHandlers) {
      allHandlers.forEach(handler => handler.apply(this, [eventName, ...params]));
    }
  },

  emit(eventName, ...params) {
    return this.trigger(eventName, ...params);
  }
}

export {
  EventMixin
};

export default (Obj) => {
  Object.assign(Obj.prototype, EventMixin);
};