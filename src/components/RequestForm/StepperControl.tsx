import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepperControlProps {
    callBack: (direction: string) => void,
    currentStep: number
}

export default function StepperControl({ callBack, currentStep }: StepperControlProps) {
    return (
        <div className="container flex justify-around mt-4 mb-8 ">
            <button onClick={() => callBack("")} className={`bg-white text-gray-700 uppercase py-2 px-4
            rounded-2xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700
            hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"} `}>
                <div className="flex">
                    <ArrowLeft />
                    <span>&nbsp;Back</span>
                </div>
            </button>
            <button onClick={() => callBack("next")} className="bg-[#4369ff] text-white uppercase py-2 px-4
            rounded-2xl font-semibold cursor-pointer hover:bg-slate-700
            hover:text-white transition duration-200 ease-in-out">
                <div className="flex">
                    <span>Next&nbsp;</span>
                    <ArrowRight />
                </div>
            </button>
        </div>
    )
}