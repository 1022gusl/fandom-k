import TributeSlider from "../../components/slider/TributeSlider";
import ChartPage from "../../components/ChartOfTheMonth/ChartPage";
import Header from "../../components/common/Header";
import "./ListPage.scss";

const ListPage = () => {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <h1 className="helloCredit">임시 크레딧</h1>
        <TributeSlider />
        <ChartPage />
      </div>
    </>
  );
};

export default ListPage;
