import { createContext, Dispatch, SetStateAction } from "react";

interface StepperContextType {
    tempData: any;
    setTempData: Dispatch<SetStateAction<any>>;
}

export const StepperContext = createContext<StepperContextType>({
    tempData: null,
    setTempData: () => {}
});