import { runAsReaction } from './reactionRunner'
import { releaseReaction } from './store'

const IS_REACTION = Symbol('is reaction')

export function observe(fn, options: any = {}) {
    const reaction = fn[IS_REACTION]
        ? fn
        : function reaction() {
            return runAsReaction(reaction, fn, this, arguments)
        }

    reaction.scheduler = options.scheduler
    reaction.debugger = options.debugger
    reaction[IS_REACTION] = true
    if (!options.lazy)
        reaction()

    return reaction
}

export function unobserve(reaction) {
    if (!reaction.unobserved) {
        reaction.unobserved = true
        releaseReaction(reaction)
    }
    if (typeof reaction.scheduler === 'object')
        reaction.scheduler.delete(reaction)
}