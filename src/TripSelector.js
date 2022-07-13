import { Fab } from "@mui/material";
import { tripKeys } from "./constants.types";

const TripSelector = ({ trips, data, onSelect, selectedVehicle }) => {
    const buttons = trips.map((k) => {
        const vehicleName = `${data[k][tripKeys.make]} ${
            data[k][tripKeys.model]
        }`;
        return (
            <span className="trip-button">
                <Fab
                    color={k === selectedVehicle ? "primary" : "secondary"}
                    aria-label={vehicleName}
                    variant="extended"
                    onClick={() => onSelect(k)}
                    key={vehicleName}
                >
                    {vehicleName}
                </Fab>
            </span>
        );
    });
    return <>{buttons}</>;
};

export default TripSelector;
