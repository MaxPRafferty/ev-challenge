import { render, screen } from "@testing-library/react";
import App from "./App";

const MOCK_TRIP = ["0"];

const MOCK_INPUTS = ["1", "2"];

const MOCK_DATA = {
    0: {
        Year: "2020",
        Make: "Audi",
        Model: "Q5",
        Series: "Premium Plus",
        Style: "4D SUV 2.0T PHEV",
        Jan: "417",
        Feb: "871",
        Mar: "949",
        Apr: "231",
        May: "507",
        Jun: "632",
        Jul: "830",
        Aug: "534",
        Sep: "973",
        Oct: "891",
        Nov: "220",
        Dec: "775",
    },
    1: {
        Year: "2019",
        Make: "Audi",
        Model: "Q7",
        Series: "",
        Style: "",
        "Covered?": "0",
        "Fuel Type": "Gasoline",
        Classification: "",
        "MPGe (Note that this is electric mpge for PHEVs)": "",
        "Miles per kWh": "",
        "Miles per gallon": "21",
        "Total Range": "472",
        "Capacity (kWh)": "",
        "": "",
    },
    2: {
        Year: "2020",
        Make: "Audi",
        Model: "Q5",
        Series: "Premium Plus",
        Style: "4D SUV 2.0T PHEV",
        "Covered?": "1",
        "Fuel Type": "Premium and Electricity",
        Classification: "PHEV",
        "MPGe (Note that this is electric mpge for PHEVs)": "65",
        "Miles per kWh": "1.93",
        "Miles per gallon": "26.5403",
        "Total Range": "20",
        "Capacity (kWh)": "10.4",
        "": "",
    },
};

test("renders EV comparison page", () => {
    render(<App data={MOCK_DATA} trips={MOCK_TRIP} inputs={MOCK_INPUTS} />);
    const linkElement = screen.getByText(
        /Electric Vehicle Performance Comparison/i
    );
    expect(linkElement).toBeInTheDocument();
});
