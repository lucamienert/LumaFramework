import middlewares from "../middlewares"
import page from "./page"

const app = (config: any) => {
    config = Object.assign({ root: true, isolate: 'middleware' }, config)

    return page(config)
        .useOnContent(middlewares.observe)
        .useOnContent(middlewares.interpolate)
        .useOnContent(middlewares.attributes)
        .useOnContent(middlewares.style)
        .useOnContent(middlewares.animate)
        .useOnContent(middlewares.ref)
        .useOnContent(middlewares.flow)
        .useOnContent(middlewares.bindable)
        .useOnContent(middlewares.bind)
        .useOnContent(middlewares.events)
}

export default app