import { isUndefined } from "../utils/utils"
import pipesFactory from "./pipeFactory"

const applyPipe = (pipeData: any, value: any) => {
    let pipe = pipesFactory.getPipe(pipeData.name)

    if(isUndefined(pipe))
        throw new Error('Pipe not found')

    if(isUndefined(pipeData.args))
        pipeData.args = []

    return pipe.transform(value, ...pipeData.args)
}

export default applyPipe