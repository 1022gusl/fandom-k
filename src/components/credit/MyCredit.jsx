import CreditIcon from '../../assets/icons/credit.svg';

const MyCredit = () => {
  return (
    <section className="creditWrapper">
      <div className="creditBox">
        <div className="creditInfo">
          <h2 className="creditTitle">내 크레딧</h2>
          <div className="creditAmount">
            <img src={CreditIcon} alt="크레딧" className="creditIcon" />
            36,000 {/* 스타일 확인차 임의 값 넣어두었습니다. */}
          </div>
        </div>
        <div className="rechargeButton">충전하기</div>
      </div>
    </section>
  );
};

export default MyCredit;
