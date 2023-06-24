import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarChart = ({ title, xData, yData, style }) => {
  const domRef = useRef();

  const chartInit = () => {
    const chart = echarts.init(domRef.current);
    chart.setOption({
      title: { text: title },
      tooltip: {},
      xAxis: { data: xData },
      yAxis: {},
      series: [{ name: "指标", type: "bar", data: yData }],
    });
  };

  useEffect(() => {
    chartInit();
  });

  return (
    <div ref={ domRef } style={ style }/>
  );
};

export default BarChart;
