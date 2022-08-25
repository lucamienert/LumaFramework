/**
 * Delays action by {ms} Miliseconds
 * @param ms 
 * @returns 
 */
export const delay = (ms: number = 1000) => new Promise((resolve, reject) => {
    setTimeout(() => resolve, ms)
})

/**
 * Check for undefined
 * @param element 
 * @returns 
 */
export const isUndefined = (element: any) => typeof element === 'undefined'

/**
 * Check for null
 * @param data 
 * @returns 
 */
export const isNull = (data: any) => data === null

/**
 * Checks wether any data is string datatype
 * @param data 
 * @returns 
 */
export const isString = (data: any) => typeof data === 'string'

/**
 * Checks if Array is empty
 * @param arr 
 * @returns 
 */
export const isEmpty = (arr: Array<any>) => arr.length && arr.length === 0