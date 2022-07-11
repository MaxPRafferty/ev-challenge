import { months } from "./constants.types";

const tripToChartSet = (trip, cost, efficiency) => {
    let err, result;
    try {
        result = months.reduce((a, v) => {
            a.push({ x: v, y: (trip[v] / efficiency) * cost });
            return a;
        }, []);
    } catch (error) {
        err = error;
    }
    return [err, result];
};

export default tripToChartSet;
