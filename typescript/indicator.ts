/* ----------- interfaces ------------*/

interface IndicatorComponents {
    historicDataHandler: Object;

    interval: string;

    span: number;

    period: number;

    caclulateHistoricValues: (calculations: number) => Array<Array<any>>;

    calculationLogic: () => any;

}

/* ----------- implementations ------------ */

class Indicator implements IndicatorComponents {

    historicDataHandler: HistoricPrices;

    interval: string

    span: number;

    period: number;

    constructor(interval: string, span: number, period: number) {
        this.historicDataHandler = new HistoricPrices()
        this.interval = this.checkInterval(interval)
        this.span = span
        this.period = period
    }

    checkInterval(interval: string): string {

        switch(interval) {
            case "MINUTE":
                break;
            case "HOUR":
                break;
            case "DAY":
                break;
            case "WEEK":
                throw new Error("I am sorry but the week interval is not implemented")
            case "MONTH":
                break;
            case "YEAR":
                break;
            default:
                throw new Error(`${interval} is not a valid interval option`)    
        }

        return interval
    }

    calculationLogic(): any {
        
    }

    caclulateHistoricValues(calculations: number): Array<Array<number>> {

        //Get most recent price bars

        return [[]]
    }
}

/* ------------- State Check ------------- */
