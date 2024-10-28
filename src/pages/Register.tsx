import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";
import Swal from "sweetalert2";
import { SuccessToast } from "../lib/Toast";


export default function Register() {

    const navigate = useNavigate();
    const [adminRole, setAdminRole] = useState(false);

    function registerUser(formData: FormData) {

        Swal.fire({
            text: "Processing...",
            didOpen: () => {
                Swal.showLoading();
            }
        })

        formData.append('roleId', `${adminRole ? '2' : '1'}`);

        authService.register(formData).then(() => {
            SuccessToast.fire({
                icon: "success",
                title: "Registered successfully"
            });
            navigate("/");
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
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg pt-10 pb-10">
                    <div className="max-w-3xl px-20">
                        <h2 className="font-bold text-2xl">Register Yourself</h2>
                        <p className="text-sm mt-4">Please enter all details</p>
                        <form action="" className="flex flex-col gap-4 w-64" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            registerUser(formData);
                        }}>
                            <input className="p-2 mt-8 rounded-xl border" type="text" name="firstName" placeholder="First Name" required />
                            <input className="p-2 rounded-xl border" type="text" name="lastName" placeholder="Last Name" required />
                            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" required />
                            <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password" required />
                            <div className="flex items-center mt-4">
                                <input type="checkbox" id="rememberMe" checked={adminRole} onChange={(e) => setAdminRole(e.target.checked)} className="rounded text-[#4369ff] focus:ring-[#4369ff] border-gray-300" />
                                <label htmlFor="adminchoice" className="ml-2 text-gray-700">Admin account</label>
                            </div>
                            <button className="bg-[#4369ff] rounded-xl text-white py-2 font-medium hover:bg-[#3451c7]" type="submit">Register</button>
                        </form>

                        <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                            <hr className="border-gray-500" />
                            <p className="text-center">OR</p>
                            <hr className="border-gray-500" />

                        </div>
                        <p className="text-center mt-5 text-black">Already have account ? <span className="text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => navigate("/")}>Login</span></p>

                    </div>
                </div>
            </section>
        </>
    )

}