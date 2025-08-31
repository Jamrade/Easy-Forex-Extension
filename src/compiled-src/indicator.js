"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Indicator {
    historicDataHandler;
    interval;
    span;
    period;
    constructor(interval, span, period) {
        this.historicDataHandler = new HistoricPrices();
        this.interval = this.checkInterval(interval);
        this.span = span;
        this.period = period;
    }
    checkInterval(interval) {
        switch (interval) {
            case "MINUTE":
                break;
            case "HOUR":
                break;
            case "DAY":
                break;
            case "WEEK":
                throw new Error("I am sorry but the week interval is not implemented");
            case "MONTH":
                break;
            case "YEAR":
                break;
            default:
                throw new Error(`${interval} is not a valid interval option`);
        }
        return interval;
    }
    calculationLogic() {
    }
    caclulateHistoricValues(calculations) {
        //Get most recent price bars
        return [[]];
    }
}
/* ------------- State Check ------------- */
//# sourceMappingURL=indicator.js.map