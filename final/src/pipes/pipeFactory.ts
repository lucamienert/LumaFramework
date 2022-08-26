class PipeFactory {
    private pipes: any

    constructor() {
        this.pipes = {}
    }

    public registerPipe(pipe: any) {
        this.pipes[pipe.name] = pipe
    }

    public getPipe(name: string) {
        return this.pipes[name]
    }
}

const pipesFactory = new PipeFactory()
export default pipesFactory