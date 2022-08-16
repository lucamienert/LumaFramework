import observer from '../utils/observerUtils'

function observe (node, state) {
    node.$contextState = observer.observable(node.$contextState)
    node.$state = observer.observable(node.$state)
  
    node.$observe = $observe
}
  
function $observe(fn, ...args) {
    args.unshift(fn, this)
    const signal = observer.observe.apply(null, args)
    this.$cleanup(unobserve, signal)
    return signal
}

const unobserve = (signal) => signal.unobserve()

observe.$name = 'observe'

export {
    observe,
    unobserve
}