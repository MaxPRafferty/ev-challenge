import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
import { Fab } from "@mui/material";
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
import { inputKeys, tripKeys } from "./constants.types";
import getVehicleByTrip from "./util.getVehicleByTrip";
import TripSelector from "./TripSelector";
import Arrow from "./icon.arrow";

const sumData = (dataset) => {
    return dataset.reduce((a, v) => {
        return a + v.y;
    }, 0);
};

function App({ trips, inputs, data }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedTrip, setSelectedTrip] = useState(null);

    if (trips.length && selectedTrip === null) {
        setSelectedTrip(trips[0]);
    }
    if (selectedTrip == null || !inputs.length || !trips.length) {
        return <>loading...</>;
    }

    const onVehicleSelect = (vehicleId) => {
        setSelectedTrip(vehicleId);
        setCurrentPage(1);
    };

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
            <ReactPageScroller
                customPageNumber={currentPage}
                pageOnChange={setCurrentPage}
            >
                <header className="App-header page">
                    <h1>Electric Vehicle Performance Comparison</h1>
                    <div>Please select a vehicle to continue</div>
                    <div className="selector-wrapper">
                        <TripSelector
                            trips={trips}
                            data={data}
                            selectedVehicle={selectedTrip}
                            onSelect={onVehicleSelect}
                        />
                    </div>

                    <div className="continue">
                        <Fab
                            aria-label="continue"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <Arrow />
                        </Fab>
                    </div>
                </header>
                <div className="page">
                    <div className="back">
                        <Fab
                            aria-label="back"
                            size="small"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ^
                        </Fab>
                    </div>
                    <p className="intro">
                        Here is your last year driving your{" "}
                        {data[selectedTrip][tripKeys.make]}{" "}
                        {data[selectedTrip][tripKeys.model]}
                    </p>
                    <MyTrips
                        scale={mileScale}
                        evData={milesDriven}
                        evLabel="Miles Driven"
                    />
                    <p className="hero">
                        You drove <b>{sumData(milesDriven)} miles</b> last year!
                        Lets take a look at what that meant for the
                        environment... and your wallet!
                    </p>
                    <div className="continue">
                        <Fab
                            aria-label="continue"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <Arrow />
                        </Fab>
                    </div>
                </div>
                <div className="page">
                    <div className="back">
                        <Fab
                            aria-label="back"
                            size="small"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ^
                        </Fab>
                    </div>
                    <p className="intro">
                        Comparing your emissions to a gasoline vehicle...
                    </p>
                    <p className="sub">
                        *calculations assume 100% electric driving. Hybrid modes
                        will increase emissions.
                    </p>
                    <p className="sub">**comparing against a 2019 Audi Q7</p>
                    <MyTrips
                        scale={scale}
                        evData={evData}
                        evLabel="Electric"
                        gasData={gasData}
                        gasLabel="Gasoline"
                    ></MyTrips>
                    <p className="hero">
                        The environment would like to thank you! By driving
                        electric, you've kept{" "}
                        <b>
                            {Math.floor(sumData(gasData) - sumData(evData))}lbs
                        </b>{" "}
                        of CO2 out of the air! Thats a reduction of{" "}
                        <b>
                            {Math.floor(
                                (sumData(evData) / sumData(gasData)) * 100
                            )}
                            %
                        </b>
                        !
                    </p>
                    <p>
                        Good news for mother nature, but lets see what that
                        looks like for your bottom line...
                    </p>
                    <div className="continue">
                        <Fab
                            aria-label="continue"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <Arrow />
                        </Fab>
                    </div>
                </div>
                <div className="page">
                    <div className="back">
                        <Fab
                            aria-label="back"
                            size="small"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ^
                        </Fab>
                    </div>
                    <p className="intro">Look at these savings!</p>
                    <MyTrips
                        scale={scaleCost}
                        evData={evCostData}
                        evLabel="Electric"
                        gasData={gasCostData}
                        gasLabel="Gasoline"
                    />
                    <p className="hero">
                        You saved{" "}
                        <b>
                            $
                            {Math.floor(
                                sumData(gasCostData) - sumData(evCostData)
                            )}
                        </b>{" "}
                        driving electric last year!
                    </p>
                    <div className="continue">
                        <Fab
                            aria-label="continue"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <Arrow />
                        </Fab>
                    </div>
                </div>
                <footer className="page">
                    <div className="back">
                        <Fab
                            aria-label="back"
                            size="small"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ^
                        </Fab>
                    </div>
                    <p className="outro">Thank you for the opportunity!</p>
                    <p className="outro">Max Rafferty, 2022</p>
                </footer>
            </ReactPageScroller>
        </div>
    );
}

export default App;
