import { isUndefined } from "../utils/utils"
import pipesFactory from "./pipeFactory"

const initPipes = (pipes: any) => {
    if(isUndefined(pipes))
        return

    pipes.forEach((pipe: any) => pipesFactory.registerPipe(pipe))
}

export default initPipes