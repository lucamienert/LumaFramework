import applyPipe from '../pipes/applyPipe'
import parsePipe from '../pipes/parsePipe'
import $ from '../utils/domManipulator'
import { isUndefined } from '../utils/utils'

class Component {
    private template: any
    private selector: any
    private styles: any
    private element: any
    private data: any
    events: any

    constructor(config: any) {
        this.template = config.template
        this.selector = config.selector
        this.styles = config.styles
        this.element = null
    }

    public render() {
        this.initStyles(this.styles)
        this.element = $(this.selector)

        if(!this.element)
            throw new Error('Compontent was not found')

        this.element.html(this.compileTemplate(this.template, this.data))
        this.initEvents.call(this)
    }

    private initEvents() {
        if(isUndefined(this.events))
            return

        let events = this.events()

        Object.keys(events).forEach(key => {
            let listener = key.split(' ')
            this.element.find(listener[1]).on(listener[0], this[events[key]].bind(this))
        })
    }

    private initStyles(styles) {
        if(isUndefined(styles))
            return

        $('STYLE').html(styles)
    }

    private compileTemplate(template: string, data: any) {
        if(isUndefined(data))
            return template

        const regex = /\{{(.*?)}}/g

        template = template.replace(regex, (str: string, d: any) => {
            let key: any = d.trim()
            let pipe: any

            if(this.hasPipe(key)) {
                pipe = parsePipe(key)
                key = this.getKeyFromPipe(key)
            }

            if(isUndefined(pipe))
                return data[key]

            return applyPipe(pipe, data[key])
        })

        return template
    }

    private hasPipe = (key: any) => key.includes('|')
    private getKeyFromPipe = (key: any) => key.split('|')[0].trim()
}

export default Component