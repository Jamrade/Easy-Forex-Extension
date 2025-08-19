"use strict";
/* ----------- Interfaces ----------*/
/* ---------- Implementations ---------- */
class APIHandler {
    sendRequest(url, method, requestHeaders, requestBody, resolver, reject) {
        let processedBody;
        if (method != "GET") {
            processedBody = JSON.stringify(requestBody);
        }
        else {
            processedBody = null;
        }
        fetch(url, {
            method: method,
            headers: requestHeaders,
            body: processedBody
        }).then(response => {
            console.log(response);
            if (response.ok) {
                return response.json().then(data => { resolver(data); });
            }
            else {
                return response.json().then(errorObj => { reject(errorObj); });
            }
        }).catch(error => {
            console.log(error);
        });
        return null;
    }
    buildQueryUrl(baseUrl, parameters) {
        let newUrl = baseUrl + "?";
        let numberOfParameters = Object.keys(parameters).length;
        let keyNumber = 0;
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
//# sourceMappingURL=REST.js.map