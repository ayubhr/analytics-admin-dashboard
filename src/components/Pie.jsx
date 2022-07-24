import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

const PieChart = ({ id, data, legendVisiblity, height }) => {
  let palettes = ["#228B22", "#F6B53F", "#E94649"];

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{
        visible: legendVisiblity,
        shapeHeight: 15,
        shapeWidth: 15,
        background: "white",
      }}
      height={height}
      background={"#fff"}
      tooltip={{ enable: true }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Rendement"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          palettes={palettes}
          legendShape="Circle"
          dataLabel={{
            visible: true,
            name: "text",
            position: "Inside",
            font: {
              fontWeight: "600",
              size: "16px",
              color: "#fff",
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

const Pie = ({ chartData }) => (
  <div className="w-full">
    <PieChart id="chart-pie" data={chartData} legendVisiblity height="full" />
  </div>
);

export default Pie;
