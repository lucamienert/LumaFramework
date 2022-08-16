export function compileRawExpression(src) {
    return new Function(
        'context', 
        'tempVars',
        `const sandbox = $nxCompileToSandbox(context, tempVars)
            try { with (sandbox) { return ${src} } } catch (err) {
                if (!(err instanceof TypeError)) 
                    throw err
            }
        $nxClearSandbox()`
      )
}

export function compileRawCode(src) {
    return new Function(
        'context', 
        'tempVars',
        `const sandbox = $nxCompileToSandbox(context, tempVars) with (sandbox) { ${src} } $nxClearSandbox()`
    )
}