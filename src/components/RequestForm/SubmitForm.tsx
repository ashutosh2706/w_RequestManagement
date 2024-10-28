import { useContext } from "react";
import { StepperContext } from "../../contexts/stepperContext";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import { requestService } from "../../services/requestService";
import Swal from "sweetalert2";


interface SubmitFormProps {
    callBack: (direction: string) => void
}

export default function SubmitForm({ callBack }: SubmitFormProps) {

    const { tempData } = useContext(StepperContext);
    const navigate = useNavigate();

    function getCurrentDate(): string {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    function getPriorityCode(priority: string) {
        return priority === 'high' ? 1 : priority === 'medium' ? 2 : 3;
    }

    const handleFormSubmit = () => {

        const token = getCookie('token') ?? '';
        const uid = decodeJwt(token)?.userId;

        const formData = new FormData();
        formData.append('title', tempData['request-title']);
        formData.append('userId', Number(uid).toString());
        formData.append('phone', tempData.phone);
        formData.append('guardianName', tempData['guardian-name']);
        formData.append('requestDate', getCurrentDate());
        formData.append('priorityCode', getPriorityCode(tempData['request-priority']).toString());
        formData.append('attachedFile', tempData['file-data']);

        requestService.submitRequest(formData).then(() => {
            Swal.fire({
                title: "Success",
                text: "Request submitted successfully",
                icon: "success"
            });
            setTimeout(() => navigate("/"), 2000);
        }).catch((error: Error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`,
                confirmButtonColor: '#4369ff'
            });
        });
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-3xl">
                    <div className="rounded-full border-2 h-24 w-24 flex items-center justify-center text-white text-4xl font-medium mt-16 bg-[#4369ff] border-[#4369ff]">
                        {
                            <span>&#63;</span>
                        }
                    </div>
                </div>
                <div className="p-5 mt-5 font-medium text-lg">
                    Submit your Request ?
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col">
                        <button className="bg-gray-500 rounded-3xl text-white py-2 font-medium p-14 text-lg mt-10" onClick={() => callBack("previous")}>Review</button>
                        <button className="bg-[#20a827] rounded-3xl text-white py-2 font-medium p-14 text-lg mt-5" onClick={handleFormSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}