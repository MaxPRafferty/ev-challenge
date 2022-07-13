import {
    VictoryBar,
    VictoryChart,
    VictoryLegend,
    VictoryGroup,
    VictoryTheme,
} from "victory";

const MyTrips = ({ scale, evData, gasData, evLabel, gasLabel }) => {
    let evBars = null;
    let gasBars = null;
    let colorScale = [];
    let legend = [];
    if (evData && evData.length) {
        evBars = <VictoryBar data={evData} />;
        colorScale.push("tomato");
        if (evLabel) {
            legend.push({ name: evLabel, symbol: { fill: "tomato" } });
        }
    }
    if (gasData && gasData.length) {
        gasBars = <VictoryBar data={gasData} />;
        colorScale.push("gold");
        if (gasLabel) {
            legend.push({ name: gasLabel, symbol: { fill: "gold" } });
        }
    }

    return (
        <div className="chart">
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ y: [0, scale] }}
            >
                <VictoryLegend
                    x={125}
                    y={50}
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    style={{
                        border: { stroke: "black" },
                        title: { fontSize: 20 },
                    }}
                    data={legend}
                />
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
