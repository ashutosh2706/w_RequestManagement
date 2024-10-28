import { useEffect, useState } from "react";
import { StepperContext } from "../contexts/stepperContext";
import Stepper from "../components/RequestForm/Stepper";
import StepperControl from "../components/RequestForm/StepperControl";
import RequestDetails from "../components/RequestForm/RequestDetails";
import SubmitForm from "../components/RequestForm/SubmitForm";
import BasicDetails from "../components/RequestForm/BasicDetails";
import UplodadFile from "../components/RequestForm/UploadFile";
import { requiredFields } from "../components/RequestForm/formFields";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookieUtil";
import { decodeJwt } from "../utils/decodeJwt";
import { message } from "antd";
import { ROLES } from "../Constants";

export default function NewRequestForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const steps: string[] = ["Basic Details", "Request Details", "Attach File", "Complete"];
    const [messageApi, contextHolder] = message.useMessage();

    const [tempData, setTempData] = useState<any>('');

    const navigate = useNavigate();

    useEffect(() => {
        const token: string | undefined = getCookie("token");
        if (token === null || token === undefined || decodeJwt(token)?.roles[0].authority === ROLES.ADMIN) {
            navigate("/403");
        }
    }, []);

    const displayFragments = (step: number) => {
        switch (step) {
            case 1:
                return <BasicDetails />
            case 2:
                return <RequestDetails />
            case 3:
                return <UplodadFile />
            case 4:
                return <SubmitForm callBack={handleClick} />
        }
    }


    const validateFields = (currentStep: number): boolean => {
        const fields = requiredFields[currentStep];
        for (const key in fields) {
            const fieldName = fields[key];
            const value = tempData[fieldName];
            if (value === null || value === undefined || value === '') {
                return false;
            }
        }
        return true;
    }

    const handleClick = (direction: string) => {

        let newStep = currentStep;
        if (direction === '' || validateFields(currentStep)) {
            direction === 'next' ? newStep++ : newStep--;
            newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        } else {
            messageApi.open({
                type: 'error',
                content: `Required fields can't be Empty`,
            });
        }

    }

    return (
        <>
            {contextHolder}
            <div className="h-screen flex justify-center items-center bg-gray-50">
                <div className="md:w-1/2 w-full mx-auto rounded-2xl pb-2 bg-gray-50 border-gray-400 flex flex-col h-screen">
                    <div className="container mt-5 mb-5">
                        <Stepper steps={steps} currentStep={currentStep} />
                    </div>
                    <div className="flex justify-center mt-10 mb-5">
                        <div className="w-4/5 py-12 shadow-lg bg-gray-100 rounded-3xl border-2 border-gray-300">
                            <StepperContext.Provider value={{ tempData, setTempData }}>
                                {displayFragments(currentStep)}
                            </StepperContext.Provider>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {currentStep !== steps.length && <StepperControl callBack={handleClick} currentStep={currentStep} />}
                    </div>
                </div>
            </div>

        </>
    )
}