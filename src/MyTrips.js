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
        <div className="chart">
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
    );
};

export default MyTrips;
