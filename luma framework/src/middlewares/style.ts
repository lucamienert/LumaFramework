function classAttribute(classes: any) {
    if (typeof classes === 'object') {
        for (let item in classes) {
            if (classes[item])
                this.classList.add(item)
            else if (this.className)
                this.classList.remove(item)
            }
      } else if (this.className !== classes)
        this.className = classes
}

function styleAttribute(styles: any) {
    if(typeof styles === 'object')
        Object.assign(this.style, styles)
    else
        this.styles.cssText = styles
}

const style = (elem: any) => {
    if(elem.nodeType !== 1)
        return

    elem.$attribute('class', classAttribute)
    elem.$attribute('style', styleAttribute)
}

style.$name = 'style'
style.$require = ['attribute']

export default style