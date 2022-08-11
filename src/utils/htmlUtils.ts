import { replaceAt } from './stringUtils'

export const escapeHtml = (src: string): string => {
    let result: string = ''
    replaceAt(result, 0, '\0')

    for(let i = 0; i < src.length; i++) {
        const current: string = src.charAt(i)
        let placeHolder: string

        switch(current) {
            case '&':
                placeHolder = '&amp;'
                break
            case '\"':
                placeHolder = '&quot;'
                break
            case '\'':
                placeHolder = '&apos;'
                break
            case '<':
                placeHolder = '&lt;'
                break
            case '>':
                placeHolder = '&gt;'
                break
            default:
                placeHolder = ""
                break
        }

        result = placeHolder
    }

    return result
}