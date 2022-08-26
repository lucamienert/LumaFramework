import { isNull, isString, isUndefined } from "./utils"

class DOMManipulator {
    private nativeElement: any
    private isWFM: boolean

    constructor(element: any) {
        if (isString(element))
            element = document.querySelector(element)

        this.nativeElement = element
        this.isWFM = true
    }

    public on(eventName: string, func: any, context: any = null) {
        func = func.bind(context)
        this.nativeElement.addEventListener(eventName, func)
        return this
    }

    public off(eventName: string, func: any) {
        this.nativeElement.removeEventListener(eventName, func)
        return this
    }

    public css(styles: string) {
        if (isUndefined(styles)) 
            return this.nativeElement.style

        Object.keys(styles).forEach(key => this.nativeElement.style[key] = styles[key])
        return this
    }

    public addClass(className: string) {
        this.nativeElement.classList.add(className)
        return this
    }

    public removeClass(className: string) {
        this.nativeElement.classList.remove(className)
        return this
    }

    public hasClass(className: string) {
        return this.nativeElement.classList.contains(className)
    }

    public html(html: any) {
        if (html.isWFM) 
            html = html.nativeElement.innerHTML

        this.nativeElement.innerHTML = html
        return this
    }

    public append(el: any) {
        if (el.isWFM) 
            el = el.nativeElement

        this.nativeElement.appendChild(el)
        return this
    }

    public parent() {
        return $(this.nativeElement.parentNode)
    }

    public attr(name: string, value: any = null) {
        if (isNull(value))
            return this.nativeElement.getAttribute(name)

        this.nativeElement.setAttribute(name, value)

        return this
    }

    public find(selector: string) {
        return $(this.nativeElement.querySelector(selector))
    }

    public findAll(selector: string) {
        return Array.from(this.nativeElement.querySelectorAll(selector)).map((el: any) => $(el))
    }
}

const $ = (el: any) => new DOMManipulator(el)

export default $