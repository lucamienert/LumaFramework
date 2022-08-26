interface IParsePipe {
    name: any
    args?: any
}

const parsePipe = (key: any): IParsePipe => {
    let pipe = key.split('|')[1].trim()

    if(!hasParams(pipe))
        return { name: pipe }

    let pipeData = pipe.split(':')

    return {
        name: pipeData[0],
        args: pipeData.slice(1)
    }
}

const hasParams = (pipe: any) => pipe.includes(':')

export default parsePipe