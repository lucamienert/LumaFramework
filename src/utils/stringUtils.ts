export const replaceAt = (str: string, index: number, replacement: string): string => {
    if(index > str.length - 1)
        return str
    return str.substring(0, index) + replacement + str.substring(index + replacement.length)
}