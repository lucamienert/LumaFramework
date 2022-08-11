import ASTType from "./astType"

class AST {
    private type:            ASTType
    
    private ignoreValue:     string
    private rawValue:        string
    private compValue:       string
    private interpreterPath: string
    private commentValue:    string
    private stringValue:     string
    private varName:         string
    private name:            string
    
    private floatValue:      number
    
    private rawChild:        AST
    private varValue:        AST
    private parent:          AST
    
    private intValue:        number
    private callGroup:       AST

    private groupItems:      Array<AST>
    private groupItemsSize:  number

    private rootItems:       Array<AST>
    private rootItemsSize:   number

    private objectVars:      Array<AST>
    private objectVarsSize:  number

    private comments:        Array<AST>
    private commentsSize:    number

    private left:            AST
    private right:           AST

    private functionBody:    AST
    private functionArgs:    AST

    private isBlock:         number
    private buffered:        number 
    private skip:            number
    private skipComments:    number

    private result:          string

    private x:               number
    private y:               number

    constructor(type: number) {
        this.type = type
    }
}

export default AST