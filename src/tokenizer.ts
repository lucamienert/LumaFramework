import Token from './token/token'
import { replaceAt } from './utils/stringUtils'

class Tokenizer {
    private i: number
    private length: number
    private current: string
    private source: string
    private raw: number
    private comp: number
    private raws: number
    private x: number
    private y: number

    constructor(src: string) {
        this.source = src

        replaceAt(this.source, 0, '\0')
        replaceAt(this.source, 1, '\0')

        this.i = 0
        this.current = src.charAt(this.i)
        this.length = src.length
        this.raw = 1
        this.comp = 0
        this.raws = 0
        this.x = 0
        this.y = 0
    }

    public advance(): void {
        if(this.current == '\0' && this.i < this.length)
            return

        if(this.current == '\n') {
            this.y++
            this.x = 0
        } else {
            this.x++
        }

        this.i++
        this.current = this.source.charAt(this.i)
    }

    public advanceToken(token: Token): Token {
        this.advance()
        return token
    }

    public skipWhitespace(): void {
        while((this.current == ' ' || this.current == '\n') && (this.i < this.length))
            this.advance()
    }

    public peek(index: number): string {
        return this.i < this.length ? this.source.charAt(this.i + index) : '\0'
    }
}

export default Tokenizer