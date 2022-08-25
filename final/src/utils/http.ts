import { isEmpty, isUndefined } from './utils'

class HTTP {
    public get(url: string): Promise<any> {
        return this.sendRequest('GET', url)
    }

    public post(url: string, headers: any, data: string): Promise<any> {
        return this.sendRequest('POST', url, headers, data)
    }

    private async sendRequest(method: string, url: string, headers?: any, data?: any): Promise<any> {
        let inf: any = { method }
        
        if(method === 'POST') {
            if(isUndefined(headers) && isEmpty(headers))
                throw new Error('Header is undefined')

            if(isUndefined(data) && isEmpty(data))
                throw new Error('Error in data')
        }

        inf = {
            method,
            headers,
            body: JSON.stringify(data)
        }

        const response = await fetch(url, inf)
        if (response.ok)
            return response.json()
    }
}

export default HTTP