import renderComponent from '../component/renderComponent'
import { isUndefined } from '../utils/utils'
import router from './router'

class RouterModule {
    private routes: any
    private dispatcher: any

    constructor(routes: any, dispatcher: any) {
        this.routes = routes
        this.dispatcher = dispatcher
    }

    public init() {
        window.addEventListener('haschange', this.renderRoute.bind(this))
        this.renderRoute.call(this)
    }

    private renderRoute() {
        let url = router.getURL()
        let route = this.routes.find((r: any) => r.path === url)

        if(isUndefined(route))
            route = this.routes.find((r: any) => r.path === '*')

        $('router-outlet').html(`<${route.component.selector}></${route.component.selector}>`)

        renderComponent(route.component)
        this.dispatcher.emit('routing.change-page')
    }
}

export default RouterModule