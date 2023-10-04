import { Bill } from "./BillItem";

function MostRecentBills({t}) {
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>{t('C-MyBills')}</h2>
        <p>{t('C-ListBills')}</p>
      </div>

      {true ? (
        <div className="hiddenScroll flex overflow-x-scroll lg:flex-wrap gap-8 my-12">
          <Bill/>
          <Bill/>
          <Bill/>
        </div>
      ) : (
        <div className="hiddenScroll flex overflow-x-scroll justify-center gap-8 my-12">
          <p className="opacity-50">{t('C-DontHaveBills')}</p>
        </div>
      )}
    </div>
  );
}

export default MostRecentBills;
