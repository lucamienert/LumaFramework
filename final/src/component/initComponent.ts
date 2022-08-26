import { isUndefined } from '../utils/utils'
import renderComponent from './renderComponent'

const initComponent = (bootstrap: any, components: any) => {
    if(isUndefined(bootstrap))
        throw new Error('Bootstrap not defined')

    const a = [bootstrap, ...components]
    a.forEach(renderComponent)
}

export default initComponent