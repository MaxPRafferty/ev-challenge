import React from "react";
import ReactDOM from "react-dom/client";
import { parse } from "csv-parse";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* MPR, 2022/7/9: these imports provide a path, not data */
import tripsPath from "./data/trips.csv";
import inputsPath from "./data/inputs.csv";
import CSVObjectify from "./util.CSVObjectify";

/* MPR, 2022/7/9: A formal store here would be overkill. Because our application
 * structure is quite flat, keeping a simple top level data object and "threading
 * the needle" to where it is needed will provide all the benefits without any
 * overcomplex setup.
 */
let trips = [];
let inputs = [];
let data = {};
let applicationError;

window.EV_CONSTANTS = window.EV_CONSTANTS || {};
const IS_PRODUCTION = !!window.EV_CONSTANTS.isProd;
const GENERIC_ERROR =
    "Unexpected Error. Please refresh the page and try again.";

/* small hack to make view height units consistent in mobile chrome, see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApplication = () => {
    root.render(
        <React.StrictMode>
            <App
                applicationError={applicationError}
                production={IS_PRODUCTION}
                data={data}
                dataLength={Object.keys(data)}
                trips={trips}
                inputs={inputs}
            />
        </React.StrictMode>
    );
};

const fetchAndNormalize = (path) => {
    return fetch(path)
        .then((res) => res.text())
        .then((rowData) => {
            return new Promise((s, f) => {
                parse(rowData, {}, (err, records) => {
                    if (err) {
                        f(err);
                        return;
                    }

                    const [transformErr, result] = CSVObjectify(records);
                    if (transformErr) {
                        f(err);
                        return;
                    }
                    s(result);
                });
            });
        });
};

/* MPR, 2022/7/9: intentionally not using await to not block render during hydration */
fetchAndNormalize(`${IS_PRODUCTION ? "/ev-challenge" : ""}${tripsPath}`)
    .then((result) => {
        trips = result.order;
        data = { ...data, ...result.data };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        /* MPR 2022/7/10: A consequence of our light state management - we must fully
         * and manually rerender upon changes to global data. For an application of this
         * size, however, the effect is imperceptible */
        renderApplication();
    });
fetchAndNormalize(`${IS_PRODUCTION ? "/ev-challenge" : ""}${inputsPath}`)
    .then((result) => {
        inputs = result.order;
        data = { ...data, ...result.data };
    })
    .catch((err) => {
        applicationError = GENERIC_ERROR;
        console.error(err);
    })
    .finally(() => {
        /* MPR 2022/7/10: A consequence of our light state management - we must fully
         * and manually rerender upon changes to global data. For an application of this
         * size, however, the effect is imperceptible */
        renderApplication();
    });

renderApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
