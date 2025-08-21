interface HistoricOperations {
    apiHandler: Object;
    cookieHandler: Object;
    getHistoricAfterDate: (interval: string, span: number, maxReturn: number, unixTimeStamp: string, marketId: string) => undefined;
    getHistoricBeforeDate: (interval: string, span: number, maxReturn: number, marketId: string) => undefined;
    getMostRecentBars: (interval: string, span: number, numberOfBars: number, marketId: string) => undefined;
    getTimeDelta: (interval: string, span: number, desiredDelta: number) => string;
}
declare class HistoricPrices implements HistoricOperations {
    apiHandler: APIHandler;
    cookieHandler: CookieHandler;
    constructor();
    getTimeDelta(interval: string, span: number, desiredDelta: number): string;
    createRequest(requestUrl: string): undefined;
    getHistoricAfterDate(interval: string, span: number, maxReturn: number, unixTimeStamp: string, marketId: string): undefined;
    getHistoricBeforeDate(interval: string, span: number, maxReturn: number, marketId: string): undefined;
    getMostRecentBars(interval: string, span: number, numberOfBars: number, marketId: string): undefined;
}
//# sourceMappingURL=historic.d.ts.map