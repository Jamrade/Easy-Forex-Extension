interface RESTAPIHandler {
    sendRequest(url: string, method: string, headers: {
        [key: string]: string;
    }, body: {
        [key: string]: string;
    }, resolver: (response: object) => null, reject: (error: string) => null): null;
    buildQueryUrl(baseUrl: string, credentials: {
        [key: string]: string;
    }, parameters: {
        [key: string]: string;
    }): string;
}
declare class APIHandler implements RESTAPIHandler {
    sendRequest(url: string, method: string, headers: {
        [key: string]: string;
    }, body: {
        [key: string]: string;
    }, resolver: (response: object) => null, reject: (error: string) => null): null;
    buildQueryUrl(baseUrl: string, credentials: {
        [key: string]: string;
    }, parameters: {
        [key: string]: string;
    }): string;
}
//# sourceMappingURL=apihandler.d.ts.map