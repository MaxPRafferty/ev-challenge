import logo from "./logo.svg";
import "./App.css";
import Compare from "./Compare";
import MyTrips from "./MyTrips";
import tripToChartSet from "./util.tripToChartSet";
import getDataCap from "./util.getDataCap";
import { POUNDS_C02_PER_GAL, POUNDS_C02_PER_KWH } from "./constants.averages";
import { inputKeys } from "./constants.types";

function App({ trips, inputs, data }) {
    if (!inputs.length || !trips.length) {
        return <>loading...</>;
    }
    const gasAudi =
        data[
            inputs[0]
        ]; /* doing this by index is a little dirty, @TODO lookup by fuel type */
    const selectedEV = data[inputs[6]]; /* even worse here */
    const [gasErr, gasData] = tripToChartSet(
        data[trips[0]],
        POUNDS_C02_PER_GAL,
        gasAudi[inputKeys.mpg]
    );
    const [evErr, evData] = tripToChartSet(
        data[trips[0]],
        POUNDS_C02_PER_KWH,
        selectedEV[inputKeys.mpge]
    );
    const [scaleErr, scale] = getDataCap(gasData);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Electric Vehicle Performance Comparison</h1>
            </header>
            <div>
                Data: {JSON.stringify(data)}
                <MyTrips
                    scale={scale}
                    evData={evData}
                    gasData={gasData}
                ></MyTrips>
                <Compare></Compare>
            </div>
            <footer>Max Rafferty, 2022</footer>
        </div>
    );
}

export default App;
