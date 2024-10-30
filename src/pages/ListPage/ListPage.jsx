import TributeSlider from "../../components/slider/TributeSlider";
import ChartPage from "../../components/ChartOfTheMonth/ChartPage";
import Header from "../../components/common/Header";
import styles from "./ListPage.module.scss";

const ListPage = () => {
  return (
    <div>
      <Header />
      {/* 임시 헤더 현재 머지 후 넣어두긴 했는데 네 잘 돌아가고 있는지 확인을 못했어요
       임시 크레딧은 후에 추가할 예정  */}
      <div className={styles.mainContainer}>
        <h1 className={styles.helloCredit}>임시 크레딧</h1>
        <TributeSlider />
        <ChartPage />
      </div>
    </div>
  );
};

export default ListPage;
