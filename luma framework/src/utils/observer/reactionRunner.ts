import {
    registerReactionForOperation,
    getReactionsForOperation,
    releaseReaction
} from './store'

const reactionStack = []
let isDebugging = false

export function runAsReaction(reaction, fn, context, args) {
    if (reaction.unobserved)
        return Reflect.apply(fn, context, args)

    if (reactionStack.indexOf(reaction) === -1) {
        releaseReaction(reaction)

        try {
            reactionStack.push(reaction)
            return Reflect.apply(fn, context, args)
        } finally {
            reactionStack.pop()
        }
    }
}

export function registerRunningReactionForOperation(operation) {
    const runningReaction = reactionStack[reactionStack.length - 1]
    
    if (runningReaction) {
        debugOperation(runningReaction, operation)
        registerReactionForOperation(runningReaction, operation)
    }
}

export function queueReactionsForOperation(operation) {
    getReactionsForOperation(operation).forEach(queueReaction, operation)
}

function queueReaction(reaction) {
    debugOperation(reaction, this)

    if (typeof reaction.scheduler === 'function')
        reaction.scheduler(reaction)
    else if (typeof reaction.scheduler === 'object')
        reaction.scheduler.add(reaction)
    else
        reaction()
}

function debugOperation(reaction, operation) {
    if (reaction.debugger && !isDebugging) {
        try {
            isDebugging = true
            reaction.debugger(operation)
        } finally {
            isDebugging = false
        }
    }
}

export function hasRunningReaction() {
    return reactionStack.length > 0
}