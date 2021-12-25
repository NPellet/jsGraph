declare type Constructor<T> = new (...args: any[]) => T;
declare function EventMixin<TBase extends Constructor<any>>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        on(eventName: string, handler: Function): any;
        off(eventName: string, handler: Function): any;
        onAll(handler: Function): any;
        ofAll(handler: Function): any;
        trigger(eventName: string, ...params: any[]): any;
        emit(eventName: string, ...params: any[]): any;
    };
} & TBase;
declare class B {
}
declare const EventEmitter: {
    new (...args: any[]): {
        [x: string]: any;
        on(eventName: string, handler: Function): any;
        off(eventName: string, handler: Function): any;
        onAll(handler: Function): any;
        ofAll(handler: Function): any;
        trigger(eventName: string, ...params: any[]): any;
        emit(eventName: string, ...params: any[]): any;
    };
} & typeof B;
export default EventMixin;
export { EventEmitter };
