import { Bill } from "./BillItem";

function MostRecentBills() {
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>My Bills</h2>
        <p>List of all bills</p>
      </div>
      <div className="hiddenScroll flex overflow-x-scroll lg:flex-wrap gap-8 my-12">
        <Bill />
        <Bill />
        <Bill />
      </div>
    </div>
  );
}

export default MostRecentBills;
