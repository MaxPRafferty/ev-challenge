import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Compare from "./Compare";
import MyTrips from "./MyTrips";
import tripToChartSet from "./util.tripToChartSet";
import getDataCap from "./util.getDataCap";
import {
    DOLLARS_PER_GAL,
    DOLLARS_PER_KWH,
    POUNDS_C02_PER_GAL,
    POUNDS_C02_PER_KWH,
} from "./constants.averages";
import { inputKeys } from "./constants.types";
import getVehicleByTrip from "./util.getVehicleByTrip";
import TripSelector from "./TripSelector";

function App({ trips, inputs, data }) {
    const [selectedTrip, setSelectedTrip] = useState(
        trips.length ? trips[0] : null
    );
    if (trips.length && selectedTrip === null) {
        setSelectedTrip(trips[0]);
    }
    if (!inputs.length || !trips.length) {
        return <>loading...</>;
    }
    const [tripErr, tripVehicle] = getVehicleByTrip(data[selectedTrip], data);
    const gasAudi =
        data[
            inputs[0]
        ]; /* Since the first car (gasoline) is effectively a constant, just select by index */
    const selectedEV = data[tripVehicle];
    const [milesErr, milesDriven] = tripToChartSet(data[selectedTrip], 1, 1);
    const [mileScaleErr, mileScale] = getDataCap(milesDriven);
    const [gasErr, gasData] = tripToChartSet(
        data[selectedTrip],
        POUNDS_C02_PER_GAL,
        gasAudi[inputKeys.mpg]
    );
    const [evErr, evData] = tripToChartSet(
        data[selectedTrip],
        POUNDS_C02_PER_KWH,
        selectedEV[inputKeys.mpkwh]
    );
    const [scaleErr, scale] = getDataCap(gasData);
    const [gasCostErr, gasCostData] = tripToChartSet(
        data[selectedTrip],
        DOLLARS_PER_GAL,
        gasAudi[inputKeys.mpg]
    );
    const [evCostErr, evCostData] = tripToChartSet(
        data[selectedTrip],
        DOLLARS_PER_KWH,
        selectedEV[inputKeys.mpkwh]
    );
    const [scaleCostErr, scaleCost] = getDataCap(gasCostData);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Electric Vehicle Performance Comparison</h1>
                <div>Please select a vehicle to continue</div>
                <div>
                    <TripSelector
                        trips={trips}
                        data={data}
                        selectedVehicle={selectedTrip}
                        onSelect={setSelectedTrip}
                    />
                </div>
            </header>
            <div>
                <MyTrips scale={mileScale} evData={milesDriven} />
                <MyTrips
                    scale={scale}
                    evData={evData}
                    gasData={gasData}
                ></MyTrips>
                <MyTrips
                    scale={scaleCost}
                    evData={evCostData}
                    gasData={gasCostData}
                />
            </div>
            <footer>Max Rafferty, 2022</footer>
        </div>
    );
}

export default App;
