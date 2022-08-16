const cleanDOM = (node) => {
    const parent = node.parentNode

    if(!parent || parent.$lifecycleStage === 'detached')
        cleanNode(node)
}

const cleanNode = (node) => {
    if(node.$lifecycleStage !== 'attached')
        return
    
    node.$lifecycleStage = 'detached'
}

export default cleanDOM