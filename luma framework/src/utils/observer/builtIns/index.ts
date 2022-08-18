import collectionHandlers from './collections'

const globalObj = typeof window === 'object' ? window : Function('return this')()

const handlers = new Map<any, any>([
    [Map, collectionHandlers],
    [Set, collectionHandlers],
    [WeakMap, collectionHandlers],
    [WeakSet, collectionHandlers],
    [Object, false],
    [Array, false],
    [Int8Array, false],
    [Uint8Array, false],
    [Uint8ClampedArray, false],
    [Int16Array, false],
    [Uint16Array, false],
    [Int32Array, false],
    [Uint32Array, false],
    [Float32Array, false],
    [Float64Array, false]
])

export function shouldInstrument({ constructor }) {
    const isBuiltIn =
        typeof constructor === 'function' &&
        constructor.name in globalObj &&
        globalObj[constructor.name] === constructor

    return !isBuiltIn || handlers.has(constructor)
}

export function getHandlers(obj) {
    return handlers.get(obj.constructor)
}