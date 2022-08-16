import compile from '../utils/compiler'

let currElem
let currAttributes = new Map()
const attributeCache = new Map()

function attributes(elem, state, next) {
    if (elem.nodeType !== 1) 
        return

    elem.$attribute = $attribute
    initAttributes(elem)
    next()
    processAttributes(elem)
}

function $attribute(name, config) {
    const attr = currAttributes.get(name)
    if (!attr) 
        return
    
    if (currElem !== this) 
        throw new Error(`${name} attribute handler for ${this.tagName} is defined too late.`)
    
    if (typeof config === 'function') 
        config = { handler: config }
    
    if (!config.handler) 
        throw new Error(`${name} attribute must have a handler`)
  
    processCustomAttribute.call(this, attr, name, config)
    currAttributes.delete(name)
}

function initAttributes(elem) {
    currElem = elem
    const cloneId = elem.getAttribute('clone-id')
    if (cloneId) {
        const attributes = attributeCache.get(cloneId)
        if (attributes) {
            currAttributes = new Map(attributes)
        } else {
            extractAttributes(elem)
            attributeCache.set(cloneId, new Map(currAttributes))
        }
    }
    extractAttributes(elem)
}

function extractAttributes(elem) {
    const attributes = elem.attributes
    let i = attributes.length
    while (i--) {
        const attribute = attributes[i]
        let type = attribute.name[0]
        let name = attribute.name

        if (type === '$' || type === '@')
            name = name.slice(1)
        else
            type = ''
        
        currAttributes.set(name, {value: attribute.value, type})
    }
}

function processAttributes(elem) {
    currAttributes.forEach(processAttribute, elem)
    currAttributes.clear()
    currElem = undefined
}

function processAttribute(attr, name) {
    if (attr.type === '$') {
        const expression = compiler.compileExpression(attr.value || name)
        processExpression.call(this, expression, name, defaultHandler)
    } else if (attr.type === '@') {
        const expression = compiler.compileExpression(attr.value || name)
        this.$observe(processExpression, expression, name, defaultHandler)
    }
}

function processCustomAttribute(attr, name, config) {
    if (config.type && config.type.indexOf(attr.type) === -1)
        throw new Error(`${name} attribute is not allowed to be ${attr.type || 'normal'} type`)

    if (config.init)
        config.init.call(this)

    if (attr.type === '@') {
        const expression = compiler.compileExpression(attr.value || name)
        this.$observe(processExpression, expression, name, config.handler)
    } else if (attr.type === '$') {
        const expression = compiler.compileExpression(attr.value || name)
        processExpression.call(this, expression, name, config.handler)
    } else
        config.handler.call(this, attr.value, name)
}

function processExpression(expression, name, handler) {
    const value = expression(this.$contextState)
    handler.call(this, value, name)
}

function defaultHandler(value, name) {
    value
        ? this.setAttribute(name, value)
        : this.removeAttribute(name)
}

attributes.$name = 'attributes'
attributes.$require = ['observe']

export {
    $attribute,
    attributes
}