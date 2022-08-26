class Pipe {
    public name: string
    public transform: any

    constructor(config: any) {
        this.name = config.name
        this.transform = config.transform
    }
}

export default Pipe