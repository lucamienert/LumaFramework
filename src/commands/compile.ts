import type { Arguments, CommandBuilder } from 'yargs'

type Options = {
    filename: string
}

export const command: string = 'compile <filename>'
export const desc: string = 'Compiles file with name <filename>.jtf'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs.positional('filename', { type: 'string', demandOption: true })

export const handler = (argv: Arguments<Options>): void => {
    const { filename } = argv
    // compile action
    process.stdout.write(filename)
    // process.exit(0)
}