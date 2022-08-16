import middlewares from "../middlewares"
import rendered from "./rendered"

const display = (config: any) => {
    config = config || {}

    return rendered(config).use(middlewares.props.apply(null, config.props || []))
}

export default display