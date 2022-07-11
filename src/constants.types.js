/***
 * Because our data headers are not formatted
 * for programmatic use, we need to translate them in some way.
 * While a little ugly, this approach is very effective and
 * straightforward.
 */
export const inputKeys = {
    year: "Year",
    make: "Make",
    model: "Model",
    series: "Series",
    style: "Style",
    covered: "Covered?",
    fuelType: "Fuel Type",
    classification: "Classification",
    mpge: "MPGe (Note that this is electric mpge for PHEVs)",
    mpkwh: "Miles per kWh",
    mpg: "Miles per gallon",
    totalRange: "Total Range",
    capacity: "Capacity (kWh)",
};

export const tripKeys = {
    year: "Year",
    make: "Make",
    model: "Model",
    series: "Series",
    style: "Style",
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
};

/* poor man's enum */
export const months = [
    tripKeys.jan,
    tripKeys.feb,
    tripKeys.mar,
    tripKeys.apr,
    tripKeys.may,
    tripKeys.jun,
    tripKeys.jul,
    tripKeys.aug,
    tripKeys.sep,
    tripKeys.oct,
    tripKeys.nov,
    tripKeys.dec,
];
