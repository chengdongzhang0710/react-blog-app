import BarChart from "@/components/BarChart";

const Home = () => {
  return (
    <div>
      <BarChart
        title="主流框架满意度"
        xData={ ["React", "Vue", "Angular"] }
        yData={ [60, 70, 80] }
        style={ { width: "500px", height: "400px" } }
      />
      <BarChart
        title="主流框架使用度"
        xData={ ["React", "Vue", "Angular"] }
        yData={ [30, 40, 50] }
        style={ { width: "500px", height: "400px" } }
      />
    </div>
  );
};

export default Home;
