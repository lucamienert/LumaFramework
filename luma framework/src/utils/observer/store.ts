const connectionStore = new WeakMap()
const ITERATION_KEY = Symbol('iteration key')

export function storeObservable(obj) {
    connectionStore.set(obj, new Map())
}

export function registerReactionForOperation(reaction, { target, key, type }) {
    if (type === 'iterate')
        key = ITERATION_KEY

    const reactionsForObj = connectionStore.get(target)
    let reactionsForKey = reactionsForObj.get(key)

    if (!reactionsForKey) {
        reactionsForKey = new Set()
        reactionsForObj.set(key, reactionsForKey)
    }

    if (!reactionsForKey.has(reaction)) {
        reactionsForKey.add(reaction)
        reaction.cleaners.push(reactionsForKey)
    }
}

export function getReactionsForOperation({ target, key, type }) {
    const reactionsForTarget = connectionStore.get(target)
    const reactionsForKey = new Set()

    if (type === 'clear') {
        reactionsForTarget.forEach((_, key) => {
            addReactionsForKey(reactionsForKey, reactionsForTarget, key)
        })
    } else addReactionsForKey(reactionsForKey, reactionsForTarget, key)

    if (type === 'add' || type === 'delete' || type === 'clear') {
        const iterationKey = Array.isArray(target) ? 'length' : ITERATION_KEY
        addReactionsForKey(reactionsForKey, reactionsForTarget, iterationKey)
    }

    return reactionsForKey
}

function addReactionsForKey(reactionsForKey, reactionsForTarget, key) {
    const reactions = reactionsForTarget.get(key)
    reactions && reactions.forEach(reactionsForKey.add, reactionsForKey)
}

export function releaseReaction(reaction) {
    if (reaction.cleaners)
        reaction.cleaners.forEach(releaseReactionKeyConnection, reaction)

    reaction.cleaners = []
}

const releaseReactionKeyConnection = (reactionsForKey) => reactionsForKey.delete(this)