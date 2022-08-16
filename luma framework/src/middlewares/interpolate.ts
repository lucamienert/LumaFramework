import compiler from '../utils/compiler'

const tokenCache = new Map()

function interpolate(node): void {
    if (node.nodeType !== 3)
        return

    createTokens(node).forEach(processToken, node)
}

function createTokens(node): any {
    const nodeValue = node.nodeValue
    let tokens = tokenCache.get(nodeValue)

    if (!tokens) {
        tokens = parseValue(node.nodeValue)
        tokenCache.set(nodeValue, tokens)
        return tokens
    }

    return tokens.map(cloneToken)
}

function cloneToken(token): any {
    if (typeof token === 'object') {
        return {
            observed: token.observed,
            expression: token.expression,
            toString: token.toString
        }
    }

    return token
}

function processToken(token, index, tokens): void {
    if (typeof token === 'object') {
        const expression = compiler.compileExpression(token.expression)
        
        token.observed
            ? this.$observe(interpolateToken, expression, token, tokens)
            : interpolateToken.call(this, expression, token, tokens)
    }
}

function interpolateToken(expression, token, tokens): void {
    let value = expression(this.$state)
    value = (value !== undefined) ? value : ''
    
    if (token.value !== value) {
        token.value = value
        this.nodeValue = (1 < tokens.length) ? tokens.join('') : value
    }
}

function parseValue(string): any {
    const tokens: any = []
    const length = string.length
    let expression = false
    let anchor = 0
    let depth = 0
    let token: any
    
    for (let i = 0; i < length; i++) {
        const char = string[i]
        
        if (expression) {
            if (char === '{')
                depth++
            else if (char === '}')
                depth--

            if (depth === 0) {
                token.expression = string.slice(anchor, i)
                token.toString = tokenToString
                tokens.push(token)
                anchor = i + 1
                expression = false
            }
        } else {
            if (i === length - 1)
                tokens.push(string.slice(anchor, i + 1))
            else if ((char === '$' || char === '@') && string.charAt(i + 1) === '{') {
                if (i !== anchor)
                    tokens.push(string.slice(anchor, i))

                token = { observed: (char === '@') }
                anchor = i + 2
                depth = 0
                expression = true
            }
        }
    }
    
    return tokens
}

function tokenToString(): string {
    return String(this.value)
}

interpolate.$name = 'interpolate'
interpolate.$require = ['observe']
interpolate.$type = 'content'

export default interpolate