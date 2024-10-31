import TributeSlider from "../../components/slider/TributeSlider";
import ChartPage from "../../components/ChartOfTheMonth/ChartPage";
import Header from "../../components/common/Header";
import "./ListPage.scss";
import MyCredit from "../../components/credit/MyCredit";

const ListPage = () => {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <MyCredit />
        <TributeSlider />
        <ChartPage />
      </div>
    </>
  );
};

export default ListPage;
