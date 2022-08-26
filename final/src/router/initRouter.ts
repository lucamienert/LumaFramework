import { isUndefined } from '../utils/utils'
import RouterModule from './router.module'

const initRouter = (routes: any, dispatcher: any) => {
    if(isUndefined(routes))
        return
    
    let routing = new RouterModule(routes, dispatcher)
    routing.init()
}

export default initRouter