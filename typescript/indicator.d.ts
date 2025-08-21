interface IndicatorComponents {
    historicDataHandler: Object;
    interval: string;
    span: number;
    period: number;
    caclulateHistoricValues: (calculations: number) => Array<Array<any>>;
    calculationLogic: () => any;
}
declare class Indicator implements IndicatorComponents {
    historicDataHandler: HistoricPrices;
    interval: string;
    span: number;
    period: number;
    constructor(interval: string, span: number, period: number);
    checkInterval(interval: string): string;
    calculationLogic(): any;
    caclulateHistoricValues(calculations: number): Array<Array<number>>;
}
//# sourceMappingURL=indicator.d.ts.map