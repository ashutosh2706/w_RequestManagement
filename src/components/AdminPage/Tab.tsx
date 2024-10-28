import { useState } from "react"
import AllUserTable from "./AllUsersTable";
import UserRequestTable from "./UserRequestTable";

export default function Tab() {

    const [activeTab, setActiveTab] = useState(1);

    return (
        <>
            <div className="m-auto">
                <div className="tab-section bg-gray-100 rounded-lg p-5 border-2 border-gray-300">
                    <div className="md:flex gap-1">
                        <button className={`md:w-1/2 w-full m-2 md:m-0 ${activeTab === 1 ? 'bg-[#4466f0] text-white shadow-xl' : 'hover:bg-gray-400 border border-gray-400'}  p-4 me-1 rounded-xl text-gray-700 font-medium md:text-lg text-base flex-grow transition duration-100`}
                        onClick={() => setActiveTab(1)} >All Users</button>
                        <button className={`md:w-1/2 w-full m-2 md:m-0 ${activeTab === 2 ? 'bg-[#4466f0] text-white shadow-xl' : 'hover:bg-gray-400 border border-gray-400'}  p-4 ms-1 rounded-xl text-gray-700 font-medium md:text-lg text-base flex-grow transition duration-100`} 
                        onClick={() => setActiveTab(2)}>User Requests</button>
                    </div>
                    <div className="mt-4">
                        <div id="tab1" className={`tab-content text-gray-700 ${activeTab === 1 ? 'block' : 'hidden'}`}>
                            <AllUserTable />
                        </div>
                        <div id="tab2" className={`tab-content text-gray-700 ${activeTab === 2 ? 'block' : 'hidden'}`}>
                            <UserRequestTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}