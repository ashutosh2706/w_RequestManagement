import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { constructQuery } from "../utils/apiUtil";

const api: AxiosInstance = apiConfig();

export const userService = {

    getUsers: async(searchTerm: string, pageNumber: number, pageSize: number) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm, "", "");

        try {
            const response = await api.get(`users?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching users");
        }
    },
    
    allowUser: async(userId: number) => {
        try {
            const response = await api.put(`users/allow/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred");
        }
    },
    
    changeRole: async(userId: number, roleId: number) => {
        try {
            await api.put('users/ChangeRole', {userId, roleId});
        } catch (error) {
            throw new Error("An error occurred");
        }
    }
}