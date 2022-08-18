import { proxyToRaw, rawToProxy } from './internals'
import { observable } from './observable'
import { hasRunningReaction, queueReactionsForOperation, registerRunningReactionForOperation } from './reactionRunner'

const hasOwnProperty = Object.prototype.hasOwnProperty
const wellKnownSymbols = new Set(
    Object.getOwnPropertyNames(Symbol)
        .map(key => Symbol[key])
        .filter(value => typeof value === 'symbol')
)

function get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    if (typeof key === 'symbol' && wellKnownSymbols.has(key))
        return result

    registerRunningReactionForOperation({ target, key, receiver, type: 'get' })
    const observableResult = rawToProxy.get(result)

    if (hasRunningReaction() && typeof result === 'object' && result !== null) {
        if (observableResult)
            return observableResult
        
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
        if (!descriptor || !(descriptor.writable === false && descriptor.configurable === false))
            return observable(result)
    }
    return observableResult || result
}

function has(target, key) {
    const result = Reflect.has(target, key)
    registerRunningReactionForOperation({ target, key, type: 'has' })
    return result
}

function ownKeys(target) {
    registerRunningReactionForOperation({ target, type: 'iterate' })
    return Reflect.ownKeys(target)
}

function set(target, key, value, receiver) {
    if (typeof value === 'object' && value !== null)
        value = proxyToRaw.get(value) || value

    const hadKey = hasOwnProperty.call(target, key)
    const oldValue = target[key]
    const result = Reflect.set(target, key, value, receiver)

    if (target !== proxyToRaw.get(receiver))
        return result

    if (!hadKey)
        queueReactionsForOperation({ target, key, value, receiver, type: 'add' })
    else if (value !== oldValue) {
        queueReactionsForOperation({
            target,
            key,
            value,
            oldValue,
            receiver,
            type: 'set'
        })
    }
    return result
}

function deleteProperty(target, key) {
    const hadKey = hasOwnProperty.call(target, key)
    const oldValue = target[key]
    const result = Reflect.deleteProperty(target, key)

    if (hadKey)
        queueReactionsForOperation({ target, key, oldValue, type: 'delete' })

    return result
}

export default { get, has, ownKeys, set, deleteProperty }