import { isUndefined } from './utils'

class EventEmitter {
    listeners: any = []

    constructor() {
        this.listeners = []
    }

    public on(eventName, func) {
        if(isUndefined(this.listeners[eventName]))
            this.listeners[eventName] = []

        this.listeners[eventName].push(func)
    }

    public emit(eventName, data) {
        if(isUndefined(this.listeners[eventName]))
            return

        this.listeners[eventName].forEach(f => f(data))
    }
}

export default EventEmitter