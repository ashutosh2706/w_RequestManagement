import { createContext,  Dispatch, SetStateAction } from "react";

interface LoginContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContext>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})