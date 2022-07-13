import { inputKeys, tripKeys } from "./constants.types";

const getVehicleByTrip = (trip, data) => {
    let result, err;
    try {
        let vehicleKey = Object.keys(data).find((k) => {
            return (
                data[k][inputKeys.covered] != null &&
                data[k][inputKeys.year] === trip[tripKeys.year] &&
                data[k][inputKeys.make] === trip[tripKeys.make] &&
                data[k][inputKeys.model] === trip[tripKeys.model] &&
                data[k][inputKeys.series] === trip[tripKeys.series] &&
                data[k][inputKeys.style] === trip[tripKeys.style]
            );
        });
        if (vehicleKey != null) {
            result = vehicleKey;
        } else {
            err = new Error("No matching vehicle found");
        }
    } catch (error) {
        err = error;
    }
    return [err, result];
};

export default getVehicleByTrip;
