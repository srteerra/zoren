import { faMugHot, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MostRecentBills() {
  const icons = [faMugHot, faMoneyBills];
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>My Bills</h2>
        <p>List of all bills</p>
      </div>
      <div className="flex flex-wrap gap-8 my-12">
        {/* Bill card */}
        <div className="flex flex-col gap-12 justify-between p-10 bg-terce rounded-2xl min-w-[350px] w-auto">
          {/* Head */}
          <div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon className="w-7 2xl:w-8 text-dark" icon={faMoneyBills} />
                <p className="font-bold text-2xl text-dark">Dinner</p>
              </div>
              <p className="font-bold text-2xl text-primary">5/5</p>
            </div>
            <div className="w-[30%] h-2 my-3 rounded-full bg-primary"></div>
          </div>
          {/* Foot */}
          <div className="flex justify-between">
            <p>5 Contributors</p>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Bill card */}
        <div className="flex flex-col gap-12 justify-between p-10 bg-terce rounded-2xl min-w-[350px] w-auto">
          {/* Head */}
          <div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon className="w-7 2xl:w-8 text-dark" icon={faMoneyBills} />
                <p className="font-bold text-2xl text-dark">Dinner</p>
              </div>
              <p className="font-bold text-2xl text-primary">5/5</p>
            </div>
            <div className="w-[30%] h-2 my-3 rounded-full bg-primary"></div>
          </div>
          {/* Foot */}
          <div className="flex justify-between">
            <p>5 Contributors</p>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Bill card */}
        <div className="flex flex-col gap-12 justify-between p-10 bg-terce rounded-2xl min-w-[350px] w-auto">
          {/* Head */}
          <div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon className="w-7 2xl:w-8 text-dark" icon={faMoneyBills} />
                <p className="font-bold text-2xl text-dark">Dinner</p>
              </div>
              <p className="font-bold text-2xl text-primary">5/5</p>
            </div>
            <div className="w-[30%] h-2 my-3 rounded-full bg-primary"></div>
          </div>
          {/* Foot */}
          <div className="flex justify-between">
            <p>5 Contributors</p>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
              <div className="w-8 h-8 bg-dark rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostRecentBills;
