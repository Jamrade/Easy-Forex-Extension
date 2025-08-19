/* ----------- Interfaces ----------*/

interface RESTAPIHandler {

    sendRequest(url: string, method: string, headers: {[key: string]: string}, body: {[key: string]: string}, resolver: (response: object) => null, reject: (error: string) => null): null;

    buildQueryUrl(baseUrl: string, parameters: {[key: string]: string}): string;

}

/* ---------- Implementations ---------- */

class APIHandler implements RESTAPIHandler {

    sendRequest(url: string, method: string, requestHeaders: {[key: string]: string}, requestBody: {[key: string]: string}, resolver: (response: {[key: string]: string}) => null, reject: (error: string)=> null): null {

        let processedBody: any

        if (method != "GET") {
            processedBody = JSON.stringify(requestBody)
        } else {
            processedBody = null
        }
        

        fetch(url, {
            method: method,
            headers: requestHeaders,
            body: processedBody
        }).then(response => {
            console.log(response)
            if (response.ok) {
                return response.json().then(data => {resolver(data)});
            } else {
                return response.json().then(errorObj => {reject(errorObj)});
            }
        }).catch(error => {
            console.log(error);
        })

        return null;
    }

    buildQueryUrl(baseUrl: string, parameters: { [key: string]: string; }): string {
        let newUrl: string = baseUrl + "?";

        let numberOfParameters: number = Object.keys(parameters).length;

        let keyNumber: number = 0;

        for (let key in parameters) {
            newUrl += key + "=" + parameters[key];
            keyNumber += 1;

            if (keyNumber != numberOfParameters) {
                newUrl += "&";
            }
        }

        return newUrl;
    }
}