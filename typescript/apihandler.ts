/* ----------- Interfaces ----------*/

interface RESTAPIHandler {

    sendRequest(url: string, method: string, headers: {[key: string]: string}, body: {[key: string]: string}, resolver: (response: object) => null, reject: (error: string) => null): null;

    buildQueryUrl(baseUrl: string, credentials: {[key: string]: string}, parameters: {[key: string]: string}): string;

}

/* ---------- Implementations ---------- */

class APIHandler implements RESTAPIHandler {

    sendRequest(url: string, method: string, headers: {[key: string]: string}, body: {[key: string]: string}, resolver: (response: object) => null, reject: (error: string)=> null): null {

        let processedBody: string = body.toString();

        fetch(url, {
            method: method,
            headers: headers,
            body: processedBody
        }).then(response => {
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

    buildQueryUrl(baseUrl: string, credentials: { [key: string]: string; }, parameters: { [key: string]: string; }): string {
        return "";
    }
}