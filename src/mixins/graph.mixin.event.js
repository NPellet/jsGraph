
const mixin = {

    on(eventName, handler) {

        if (!this.__eventHandlers) {
            this.__eventHandlers = {};
        }

        if (!this.__eventHandlers[eventName]) {
            this.__eventHandlers[eventName] = {};
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

    trigger(eventName, ...params) {

        if (this.__eventHandlers?.[eventName]) {
            return;
        }

        this.__eventHandlers[eventName].forEach(handler => handler.apply(this, params));
    },

    emit(eventName, ...params) {
        return this.trigger(eventName, ...params);
    }
};

export default mixin;