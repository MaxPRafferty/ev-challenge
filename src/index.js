import React from "react";
import ReactDOM from "react-dom/client";
import { parse } from "csv-parse";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* MPR, 2022/7/9: these imports provide a path, not data */
import tripsPath from "./data/trips.csv";
import inputsPath from "./data/inputs.csv";

/* MPR, 2022/7/9: A formal store here would be overkill. Because our application
 * structure is quite flat, keeping a simple top level data object and "threading
 * the needle" to where it is needed will provide all the benefits without any
 * overcomplex setup.
 */
let trips = [];
let inputs = [];
let data = {};

window.EV_CONSTANTS = window.EV_CONSTANTS || {};
const IS_PRODUCTION = !!window.EV_CONSTANTS.isProd;

/* MPR, 2022/7/9: intentionally not using await to not block render during hydration */
fetch(`${IS_PRODUCTION ? "/ev-challenge" : ""}${tripsPath}`)
    .then((res) => res.text())
    .then((data) => {
        console.log(data);
        parse(data, {}, (err, records) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(JSON.stringify(records));
        });
    })
    .catch((err) => console.log(err));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App
            production={IS_PRODUCTION}
            data={data}
            dataLength={Object.keys(data)}
            trips={trips}
            inputs={inputs}
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
