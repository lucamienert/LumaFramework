import middlewares from "../middlewares"
import rendered from "./rendered"

const page = (config: any) => {
    config = config || {}

    return rendered(config)
        .use(middlewares.meta(config))
        .use(middlewares.params(config.params || {}))
}

export default page