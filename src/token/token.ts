import TokenType from './tokentype'

class Token {
    private value: string
    private type: TokenType
    private x: number
    private y: number
    
    constructor(value: string, type: number) {
        this.value = value
        this.type = type
        this.x = 0
        this.y = 0
    }
}

export default Token