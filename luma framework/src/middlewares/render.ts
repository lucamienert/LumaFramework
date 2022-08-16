let cloneId = 0
let selectorScope
const hostRegex = /:host/g
const functionalHostRegex = /:host\((.*?)\)/g

function renderFactory(config) {
    config = validateAndCloneConfig(config)
    config.template = cacheTemplate(config.template)

    function render(elem) {
        if (config.shadow && elem.attachShadow) {
            const shadowRoot = elem.attachShadow({ mode: 'open' })
            if (config.template) {
                const template = document.importNode(config.template, true)
                shadowRoot.appendChild(template)
            }

            if (config.style) {
                const style = document.createElement('style')
                style.appendChild(document.createTextNode(config.style))
                shadowRoot.appendChild(style)
            }
        } else {
            if (config.template) {
                const template = document.importNode(config.template, true)
                addContext(elem)
                composeContentWithTemplate(elem, template)
            }

            if (config.style) {
                addScopedStyle(elem, config.style)
                config.style = undefined
            }
        }
    }

    render.$name = 'render'
    render.$type = 'component'
    return render
}

function addContext(elem) {
    let child = elem.firstChild
    while (child) {
        child.$contextState = elem.$contextState
        child = child.nextSibling
    }
}

function composeContentWithTemplate(elem, template) {
    let defaultSlot
    const slots = template.querySelectorAll('slot')

    for (let i = slots.length; i--;) {
        const slot = slots[i]
        if (slot.getAttribute('name')) {
            const slotFillers = elem.querySelectorAll(`[slot=${slot.getAttribute('name')}]`)
            if (slotFillers.length) {
                slot.innerHTML = ''
                for (let i = slotFillers.length; i--;) {
                    slot.appendChild(slotFillers[i])
                }
            }
        } else defaultSlot = slot
    }

    if (defaultSlot && elem.firstChild) {
        defaultSlot.innerHTML = ''
        while (elem.firstChild) {
            defaultSlot.appendChild(elem.firstChild)
        }
    }
    elem.innerHTML = ''
    elem.appendChild(template)
}

function addScopedStyle(elem, styleString) {
    setSelectorScope(elem)
    styleString = styleString
        .replace(functionalHostRegex, `${selectorScope}$1`)
        .replace(hostRegex, selectorScope)

    const style = document.createElement('style')
    style.appendChild(document.createTextNode(styleString))
    document.head.insertBefore(style, document.head.firstChild)

    scopeSheet(style.sheet)
}

function setSelectorScope(elem) {
    const is = elem.getAttribute('is')
    selectorScope = (is ? `${elem.tagName}[is="${is}"]` : elem.tagName).toLowerCase()
}

function scopeSheet(sheet) {
    const rules = sheet.cssRules
    for (let i = rules.length; i--;) {
        const rule = rules[i]
        if (rule.type === 1) {
            const selectorText = rule.selectorText.split(',').map(scopeSelector).join(', ')
            const styleText = rule.style.cssText
            sheet.deleteRule(i)
            sheet.insertRule(`${selectorText} { ${styleText} }`, i)
        } else if (rule.type === 4)
            scopeSheet(rule)
    }
}

function scopeSelector(selector) {
    if (selector.indexOf(selectorScope) !== -1)
        return selector

    return `${selectorScope} ${selector}`
}

function cacheTemplate(templateHTML) {
    if (!templateHTML)
        return

    const template = document.createElement('template')
    template.innerHTML = templateHTML
    return template.content
}

function validateAndCloneConfig(rawConfig) {
    const resultConfig: any = {}

    if (typeof rawConfig !== 'object')
        throw new TypeError('config must be an object')

    if (typeof rawConfig.template === 'string')
        resultConfig.template = rawConfig.template
    else if (rawConfig.template !== undefined)
        throw new TypeError('template config must be a string or undefined')
        
    if (typeof rawConfig.style === 'string')
        resultConfig.style = rawConfig.style
    else if (rawConfig.style !== undefined)
        throw new TypeError('style config must be a string or undefined')

    if (typeof rawConfig.shadow === 'boolean')
        resultConfig.shadow = rawConfig.shadow
    else if (rawConfig.shadow !== undefined)
        throw new TypeError('shadow config must be a boolean or undefined')

    return resultConfig
}

export default renderFactory