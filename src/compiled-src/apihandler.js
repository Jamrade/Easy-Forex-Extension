"use strict";
/* ----------- Interfaces ----------*/
/* ---------- Implementations ---------- */
class APIHandler {
    sendRequest(url, method, headers, body, resolver, reject) {
        let processedBody = body.toString();
        fetch(url, {
            method: method,
            headers: headers,
            body: processedBody
        }).then(response => {
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
    buildQueryUrl(baseUrl, credentials, parameters) {
        return "";
    }
}
//# sourceMappingURL=apihandler.js.map