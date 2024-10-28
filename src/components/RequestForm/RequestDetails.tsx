import { useContext } from "react";
import { StepperContext } from "../../contexts/stepperContext";


export default function RequestDetails() {


    const { tempData, setTempData } = useContext(StepperContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setTempData({ ...tempData, [name]: value })
    }

    const handleDropdownChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const target = e.target as HTMLSelectElement;
        const { name, value } = target;
        setTempData({ ...tempData, [name]: value })
    }
    

    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-3xl md:px-20 px-10">
                    <h2 className="font-medium underline md:text-2xl text-lg text-center mb-10 font-sans">Request Details</h2>
                    <p className="md:text-sm text-xs mt-4 mb-4 text-gray-500">Fields marked <span className="text-red-600 font-bold text-lg">*</span> are required</p>
                    <div className="flex flex-col gap-4">
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Request for <span className="text-red-600 font-bold text-lg">*</span></div>
                        <input
                            onChange={handleChange}
                            value={tempData["request-title"] || ""}
                            className="p-2 rounded-xl border border-gray-300" type="text" name="request-title" placeholder="What this request is for" maxLength={50}/>
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Description <span className="text-red-600 font-bold text-lg"></span></div>
                        <input
                            onChange={handleChange}
                            value={tempData["request-desc"] || ""}
                            className="p-2 rounded-xl border" type="text" name="request-desc" placeholder="Describe request in brief" />
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Priority <span className="text-red-600 font-bold text-lg">*</span></div>
                        <select
                            onChange={handleDropdownChange}
                            value={tempData["request-priority"] || ""}
                            className="p-2 rounded-xl border" name="request-priority">
                            <option value="">Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Normal</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}