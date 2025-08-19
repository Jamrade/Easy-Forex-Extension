interface RESTAPIHandler {
    sendRequest(url: string, method: string, headers: {
        [key: string]: string;
    }, body: {
        [key: string]: string;
    }, resolver: (response: object) => null, reject: (error: string) => null): null;
    buildQueryUrl(baseUrl: string, parameters: {
        [key: string]: string;
    }): string;
}
declare class APIHandler implements RESTAPIHandler {
    sendRequest(url: string, method: string, requestHeaders: {
        [key: string]: string;
    }, requestBody: {
        [key: string]: string;
    }, resolver: (response: {
        [key: string]: string;
    }) => null, reject: (error: string) => null): null;
    buildQueryUrl(baseUrl: string, parameters: {
        [key: string]: string;
    }): string;
}
//# sourceMappingURL=REST.d.ts.map