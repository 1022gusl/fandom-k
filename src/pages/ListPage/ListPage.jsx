import TributeSlider from "../../components/slider/TributeSlider";
import ChartPage from "../../components/ChartOfTheMonth/ChartPage";
import Header from "../../components/common/Header";
import "./ListPage.scss";

const ListPage = () => {
  return (
    <div>
      <Header />
      {/* 임시 헤더 현재 머지 후 넣어두긴 했는데 네 잘 돌아가고 있는지 확인을 못했어요
       임시 크레딧은 후에 추가할 예정  */}
      <div className="mainContainer">
        <h1 className="helloCredit">임시 크레딧</h1>
        <h2>요 왼쪽 부분에 후원을 기다리는 조공 텍스트(타이틀) 추가하기</h2>
        {/* 후원을 기다리는 조공 텍스트는 TributeSlider 컴포넌트 안에서 구현하는게 좋아보이는데
            코드를 조금 만져봤는데 제가 작성한 컴포넌트가 아니라서 헷갈리더라고요...
            컴포넌트 코드 유지보수 측면에서도 해당 부분 작업하신 광조님이 추가해주시는게 좋아보입니다!
        */}
        <TributeSlider />
        <ChartPage />
      </div>
    </div>
  );
};

export default ListPage;
