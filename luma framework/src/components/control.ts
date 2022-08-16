import middlewares from "../middlewares"
import display from "./display"
import rendered from "./rendered"

const control = (config: any) => {
    config = config || {}

    return display(config).use(middlewares.params(config.params || {}))
}

export default control