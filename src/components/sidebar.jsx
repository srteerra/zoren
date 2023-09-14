import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/solid";

function Sidebar() {
    
    return(
        <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 2xl:w-1/5 bg-primary">
            <div>
                <div className="flex flex-col items-center">
                    <h1 className="text-white">Logo</h1>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div>
                    <p className="text-gray-400 hover:text-white">Home</p>
                </div>
                <div>
                    <p className="text-gray-400 hover:text-white">Collections</p>
                </div>
                <div>
                    <p className="text-gray-400 hover:text-white">Inbox</p>
                </div>
                <div>
                    <p className="text-gray-400 hover:text-white">Settings</p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <button className="w-2/3 bg-white transition flex justify-center items-center gap-2 border-2 py-2 px-4 my-4 rounded-full">
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                Disconnect
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;