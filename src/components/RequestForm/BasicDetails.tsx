import { useContext } from "react";
import { StepperContext } from "../../contexts/stepperContext";



export default function BasicDetails() {

    const { tempData, setTempData } = useContext(StepperContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setTempData({ ...tempData, [name]: value });
    }


    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-3xl md:px-20 px-10">
                    <h2 className="font-medium underline md:text-2xl text-lg text-center mb-10 font-sans">Basic Details</h2>
                    <p className="md:text-sm text-xs mt-4 mb-4 text-gray-500">Fields marked <span className="text-red-600 font-bold text-lg">*</span> are required</p>
                    <div className="flex flex-col gap-4">
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Email <span className="text-red-600 font-bold text-lg">*</span></div>
                        <input
                            onChange={handleChange}
                            value={tempData["email"] || ""}
                            className="p-2 rounded-xl border border-gray-300" type="email" name="email" placeholder="Email Address" />
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Mobile Number <span className="text-red-600 font-bold text-lg"></span></div>
                        <input
                            onChange={handleChange}
                            value={tempData["phone"] || ""}
                            className="p-2 rounded-xl border" type="text" name="phone" placeholder="Mobile Number" />
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Guardian Name <span className="text-red-600 font-bold text-lg">*</span></div>
                        <input
                            onChange={handleChange}
                            value={tempData["guardian-name"] || ""}
                            className="p-2 rounded-xl border" type="text" name="guardian-name" placeholder="Guardian Name" />
                    </div>
                </div>
            </div>
        </>
    )
}