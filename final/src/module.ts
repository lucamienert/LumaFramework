import initComponent from './component/initComponent'
import initDirectives from './directive/initDirectives'
import initPipes from './pipes/initPipes'
import initRouter from './router/initRouter'
import EventEmitter from './utils/event'

class Module {
    private components: any
    private bootstrapComponent: any
    private routes: any
    private directives: any
    private pipes: any
    private dispatcher: EventEmitter

    constructor(config) {
        this.components = config.components
        this.bootstrapComponent = config.bootstrap
        this.routes = config.routes
        this.directives = config.directives
        this.pipes = config.pipes

        this.dispatcher = new EventEmitter()
    }

    public start() {
        initPipes(this.pipes)
        initComponent(this.bootstrapComponent, this.components)
        initRouter(this.routes, this.dispatcher)
        initDirectives(this.directives)

        this.dispatcher.on('routing.change-page', () => initDirectives(this.directives))
    }
}

export default Module