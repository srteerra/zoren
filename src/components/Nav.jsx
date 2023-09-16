import { DarkMode } from "./DarkMode";
import RegionChange from "./Region";

function Nav() {
  return (
    <div className="w-full flex items-center justify-between py-12">
      <h1>Dashboard</h1>
      <div className="flex items-center gap-4">
        <DarkMode />
        <RegionChange />
      </div>
    </div>
  );
}

export default Nav;
