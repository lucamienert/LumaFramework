import component from "../core/component"
import middlewares from "../middlewares"

const router = (config: any) => {
    config = Object.assign({ state: false }, config)

    return component(config).use(middlewares.route)
}

export default router