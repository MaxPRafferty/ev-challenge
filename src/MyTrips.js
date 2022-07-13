import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryGroup,
    VictoryLine,
    VictoryTheme,
    VictoryStack,
} from "victory";
import { months } from "./constants.types";

/*
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { a: new Date(1982, 1, 1), b: 125 },
                { a: new Date(1987, 1, 1), b: 257 },
                { a: new Date(1993, 1, 1), b: 345 },
                { a: new Date(1997, 1, 1), b: 515 },
                { a: new Date(2001, 1, 1), b: 132 },
                { a: new Date(2005, 1, 1), b: 305 },
                { a: new Date(2011, 1, 1), b: 270 },
                { a: new Date(2015, 1, 1), b: 470 }
              ]}
              x="a"
              y="b"
            />
            */

const MyTrips = ({ scale, evData, gasData }) => {
    let evBars = null;
    let gasBars = null;
    let colorScale = [];
    if (evData && evData.length) {
        evBars = <VictoryBar data={evData} />;
        colorScale.push("tomato");
    }
    if (gasData && gasData.length) {
        gasBars = <VictoryBar data={gasData} />;
        colorScale.push("gold");
    }

    return (
        <>
            Trip Data
            <div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domain={{ y: [0, scale] }}
                >
                    <VictoryGroup
                        offset={6}
                        style={{ data: { width: 6 } }}
                        colorScale={colorScale}
                    >
                        {evBars}
                        {gasBars}
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </>
    );
};

export default MyTrips;
