import AppDownload from "../../components/AppDownload/AppDownload";
import Header from "../../components/Header/Header";
import Sponsor from "../../components/Sponsor/Sponsor";
import TimeTable from "../../components/TimeTable/TimeTable";
import "./Home.css";

const Home = () => {

  return (
    <div>
      <Header></Header>
      <Sponsor></Sponsor>
      <TimeTable></TimeTable>
    </div>
  );
};

export default Home;
