import component from "../core/component"
import middlewares from "../middlewares"

const rendered = (config: any) => {
    config = config || {}

    return component(config).use(middlewares.render(config))
}

export default rendered