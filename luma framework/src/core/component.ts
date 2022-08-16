import { prevalidateMiddlewares } from "./middlewareValidator"
import validateConfig from "./validateConfig"

const secret: any = {
    config: Symbol('component config')
}

const component = (rawConfig: any): any => {
    return { use, useOnContent, register, [secret.config]: validateConfig(rawConfig) }
}

function use(middleware: Function) {
    const config = this[secret.config]
    
    config.middlewares = config.middlewares || []
    config.middlewares.push(middleware)

    return this
}

function useOnContent(middleware: Function) {
    const config = this[secret.config]

    config.contentMiddlewares = config.contentMiddlewares || []
    config.contentMiddlewares.push(middleware)

    return this
}

function register(name: string) {
    const config = this[secret.config]

    config.validated = prevalidateMiddlewares(config.contentMiddlewares, config.middlewares)
    registerElement(name, config)
}

export default component