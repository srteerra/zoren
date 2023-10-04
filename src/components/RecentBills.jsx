import { useContext, useEffect, useState } from "react";
import { Bill } from "./BillItem";
import AppContext from "@/context/AppContext";
import { handleGetCollections } from "@/hooks/useGetCollection";

function MostRecentBills() {
  const { state, listener } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await handleGetCollections(state.userAddress));
    };

    fetchData();
  }, []);


  if(data) {
    const arrayList = data.map((collection) => (
      <Bill
        key={collection.title}
        data={collection}
      />
    ));
    return (
      <div className="my-12">
        {/* Header */}
        <div>
          <h2>My Bills</h2>
          <p>List of all bills</p>
        </div>
  
        {true ? (
          <div className="hiddenScroll flex overflow-x-scroll lg:flex-wrap gap-8 my-12">
            {arrayList}
          </div>
        ) : (
          <div className="hiddenScroll flex overflow-x-scroll justify-center gap-8 my-12">
            <p className="opacity-50">You dont have bills.</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="hiddenScroll flex overflow-x-scroll justify-center gap-8 my-12">
        <p className="opacity-50">You dont have bills.</p>
      </div>
    )
  }
  
}

export default MostRecentBills;
