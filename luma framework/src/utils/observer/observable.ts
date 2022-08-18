import { proxyToRaw, rawToProxy } from './internals'
import { storeObservable } from './store'
import * as builtIns from './builtIns'
import baseHandlers from './handlers'

export function observable(obj = {}) {
    if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj))
        return obj

    return rawToProxy.get(obj) || createObservable(obj)
}

function createObservable(obj) {
    const handlers = builtIns.getHandlers(obj) || baseHandlers
    const observable = new Proxy(obj, handlers)
    rawToProxy.set(obj, observable)
    proxyToRaw.set(observable, obj)
    storeObservable(obj)
    return observable
}

export function isObservable(obj) {
    return proxyToRaw.has(obj)
}

export function raw(obj) {
    return proxyToRaw.get(obj) || obj
}