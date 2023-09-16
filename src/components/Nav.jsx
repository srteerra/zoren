import DarkMode from "./DarkMode";
import RegionChange from "./Region";

function Nav() {
    
    return(
        <div className="w-full hidden lg:flex items-center justify-between py-12">
            <h1>Dashboard</h1>
            <div className="items-center gap-4 hidden lg:flex">
                <DarkMode />
                <RegionChange />
            </div>
        </div>
    )
}

export default Nav;