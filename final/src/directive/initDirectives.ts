import { isUndefined } from '../utils/utils'
import Directive from './directive'

const initDirectives = (directives: Array<Directive>) => {
    if(isUndefined(directives))
        return

    directives.forEach((element: Directive) => element.init())
}

export default initDirectives