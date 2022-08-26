import { isUndefined } from '../utils/utils'

const renderComponent = (component: any) => {
    if(isUndefined(component.onInit))
        component.onInit()

    component.render()

    if(!isUndefined(component.afterInit))
        component.afterInit()
}

export default renderComponent