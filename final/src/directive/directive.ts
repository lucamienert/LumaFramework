import $ from '../utils/domManipulator'
import { isEmpty, isUndefined } from '../utils/utils'

class Directive {
    private onInit: any
    private selector: any

    constructor(config: any) {
        this.selector = config.selector
        this.onInit = config.onInit
    }

    public init() {
        let elements = $(document).findAll(this.selector)

        if(isUndefined(this.onInit) && !isEmpty(elements))
            elements.forEach(element => this.onInit(element, this.getParamValue(element, this.selector)))
    }

    private getParamValue = (element: any, selector: any) => element.attr(selector.slice(1, selector.length -1 ))
}

export default Directive