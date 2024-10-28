import { User, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { deleteCookie, getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";
import { LoginContext } from "../../contexts/loginContext";


export default function Navbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuExpanded, setMenuExpanded] = useState(false);
    const { setIsLoggedIn } = useContext(LoginContext);

    function handleLogout() {

        Swal.fire({
            title: "Confirm",
            text: "Are you sure you want to logout ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4369ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCookie('token');
                deleteCookie('role');
                setIsLoggedIn(false);
            }
        });
    }

    const fullName = (): string => {
        const token = getCookie('token');
        if (token) {
            const firstName = decodeJwt(token)?.firstName;
            const lastName = decodeJwt(token)?.lastName;
            return `${firstName} ${lastName}`;
        }
        return '';
    }

    return (
        <>
            <nav className="bg-gray-800 p-5">
                <div className="container mx-auto flex justify-between items-center relative">

                    <div className="text-white flex flex-col items-center justify-center">
                        <img src='./vite.svg' alt="Logo" className="rounded-full h-10 w-10 mr-2 hidden md:block" />
                        <div className="flex flex-col md:hidden absolute top-0 left-0">
                            <Menu className="h-10 w-10" onClick={() => setMenuExpanded(!isMenuExpanded)} />
                            {isMenuExpanded && (
                                <div className="w-[200px] mt-5 flex flex-col items-center justify-center bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-lg">
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">Home</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">About</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">Services</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 pb-5 hover:bg-gray-500 rounded-xl h-8">Contact</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex items-center h-10 min-w-32">
                            <div className="h-10 w-10 items-center justify-center bg-gray-300 rounded-full mr-2 hidden sm:flex">
                                <User className="h-6 w-6 text-gray-600" />
                            </div>
                            <span className="text-white mr-4 font-medium hover:underline cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{fullName()}</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md">
                                <button className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100" onClick={handleLogout}>
                                    <LogOut className="h-5 w-5 inline-block mr-2" /> Logout
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </>
    )
}