import AST from './ast'

class JTF {
    private res: string
    private node: AST

    constructor(res: string, node: AST) {
        this.res = res
        this.node = node
    }
}

export default JTF