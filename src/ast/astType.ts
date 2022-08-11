enum ASTType {
    AST_NOOP,
    AST_COMP,
    AST_ASSIGN,
    AST_FUNCTION,
    AST_FUNCTION_CALL,
    AST_STRING,
    AST_FLOAT,
    AST_INT,
    AST_VAR,
    AST_GROUP,
    AST_ROOT,
    AST_COMMENT,
    AST_CALL,
    AST_OBJECT,
    AST_DOT,
    AST_NEWLINE,
    AST_NAME
}

export default ASTType