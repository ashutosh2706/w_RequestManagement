import { AxiosError, AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { LoginRequest } from "../types/loginRequest";
import { LoginResponse } from "../types/loginResponse";


const api: AxiosInstance = apiConfig();

const authService = {

    login: async(loginData: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await api.post('auth/login', loginData);
            return response.data;
        } catch (error) {
            if(error instanceof AxiosError) {
                if(error.response?.status === 400) throw new Error(`${error.response.status}: ${error.response.data.error}`);
                else throw new Error("500: Internal Server Error");
            } else {
                throw new Error("An error occurred while logging in.");
            }
        }
    },

    register: async (userData: FormData) => {
        try {
            const response = await api.post('Users/register', userData);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while registering user.");
        }
    }
    
}

export default authService;