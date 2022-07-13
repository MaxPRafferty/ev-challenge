import { Fab } from "@mui/material";
import { tripKeys } from "./constants.types";

const TripSelector = ({ trips, data, onSelect, selectedVehicle }) => {
    const buttons = trips.map((k) => {
        const vehicleName = `${data[k][tripKeys.make]} ${
            data[k][tripKeys.model]
        }`;
        return (
            <span className="trip-button" key={vehicleName}>
                <Fab
                    color={k === selectedVehicle ? "primary" : "neutral"}
                    aria-label={vehicleName}
                    variant="extended"
                    onClick={() => onSelect(k)}
                >
                    {vehicleName}
                </Fab>
            </span>
        );
    });
    return <>{buttons}</>;
};

export default TripSelector;
