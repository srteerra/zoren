import { Bill } from "./BillItem";

function MostRecentBills() {
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>My Bills</h2>
        <p>List of all bills</p>
      </div>

      {true ? (
        <div className="hiddenScroll flex overflow-x-scroll lg:flex-wrap gap-8 my-12">
          <Bill />
          <Bill />
          <Bill />
        </div>
      ) : (
        <div className="hiddenScroll flex overflow-x-scroll justify-center gap-8 my-12">
          <p className="opacity-50">You dont have bills.</p>
        </div>
      )}
    </div>
  );
}

export default MostRecentBills;
