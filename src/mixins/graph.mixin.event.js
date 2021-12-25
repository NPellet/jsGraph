function EventMixin(Base) {
    return class EventMixing extends Base {
        on(eventName, handler) {
            if (!this.__eventHandlers) {
                this.__eventHandlers = {};
            }
            if (!this.__eventHandlers[eventName]) {
                this.__eventHandlers[eventName] = [];
            }
            this.__eventHandlers[eventName].push(handler);
            return this;
        }
        off(eventName, handler) {
            var _a;
            let handlers = (_a = this.__eventHandlers) === null || _a === void 0 ? void 0 : _a[eventName];
            if (!handlers) {
                return;
            }
            if (!handler) {
                handlers = []; // Reset the array and let the GC recycle all the handlers
            }
            else {
                for (let i = 0, l = handlers.length; i < l; i++) {
                    if (handlers[i] == handler) {
                        handlers.splice(i--, 1);
                    }
                }
            }
            return this;
        }
        onAll(handler) {
            return this.on('__all', handler);
        }
        ofAll(handler) {
            return this.off('__all', handler);
        }
        trigger(eventName, ...params) {
            var _a, _b;
            if ((_a = this.__eventHandlers) === null || _a === void 0 ? void 0 : _a[eventName]) {
                this.__eventHandlers[eventName].forEach(handler => handler.apply(this, params));
            }
            const allHandlers = (_b = this.__eventHandlers) === null || _b === void 0 ? void 0 : _b.__all;
            if (allHandlers) {
                allHandlers.forEach(handler => handler.apply(this, [eventName, ...params]));
            }
            return this;
        }
        emit(eventName, ...params) {
            return this.trigger(eventName, ...Array.from(params));
        }
    };
}
class B {
}
const EventEmitter = EventMixin(B);
export default EventMixin;
export { EventEmitter };
