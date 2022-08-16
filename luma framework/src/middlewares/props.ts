import { $attribute } from "./attributes"

function propHandler(value, name) {
    this.$state[name] = value
}

function propsFactory(...propNames) {
    function props(elem) {
        for(let propName of propNames)
            elem.$attribute(propName, propHandler)
    }

    props.$name = 'props'
    props.$require = ['attributes']
    props.$type = 'component'
    return props
}