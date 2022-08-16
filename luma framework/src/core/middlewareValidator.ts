const names = new Set()
const missing = new Set()
const duplicates = new Set()

const validateMiddleware = (middleware): void => {
    const name = middleware.name
    const require = middleware.require

    if(name) {
        if(names.has(name))
            duplicates.add(name)
        
        names.add(name)
    }
    
    if(require) {
        for(let dependency of require)
            if(!names.has(dependency)) 
                missing.add(dependency)
    }
}

const validateMiddlewares = (node) :void => {
    if(node.validated)
        return
    
    names.clear()
    missing.clear()
    duplicates.clear()

    const contentMiddlewares = node.contentMiddlewares
    const middlewares = node.middlewares

    if(contentMiddlewares)
        contentMiddlewares.forEach(validateMiddleware)

    if(middlewares)
        middlewares.forEach(validateMiddleware)

    if(missing.size || duplicates.size)
        throw new Error()
}

const prevalidateMiddlewares = (contentMiddlewares, middlewares): boolean => {
    names.clear()
    missing.clear()
    duplicates.clear()

    if(contentMiddlewares)
        contentMiddlewares.forEach(validateMiddleware)

    if(middlewares)
        middlewares.forEach(validateMiddleware)
    
    return missing.size + duplicates.size === 0
}

export {
    validateMiddleware,
    validateMiddlewares,
    prevalidateMiddlewares
}