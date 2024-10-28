import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { UserRequestFromApi } from "../types/userRequest";
import { constructQuery } from "../utils/apiUtil";

const api: AxiosInstance = apiConfig();

export const requestService = {

    getUserRequests: async(userId: number, searchTerm: string, pageNumber: number, pageSize: number, sortField: string, sortDirection: string) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm, sortField, sortDirection);

        try {
            const response = await api.get(`requests/user/${userId}?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching requests");
        }
    },

    getAllRequests: async(searchTerm: string, pageNumber: number, pageSize: number, sortField: string, sortDirection: string) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm, sortField, sortDirection);

        try {
            const response = await api.get(`requests?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching requests");
        }
    },

    updateRequestStatus: async(updateRequestData: FormData) => {
        try {
            await api.put('requests/update', updateRequestData);
        } catch (error) {
            throw new Error("An error occurred while updating request status");
        }
    },

    getRequestByRequestId: async(requestId: number): Promise<UserRequestFromApi> => {
        try {
            const response = await api.get(`requests/${requestId}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching request details");
        }
    },
    
    submitRequest: async(requestData: FormData) => {
        try {
            await api.post('requests/add', requestData);
        } catch (error) {
            throw new Error('500: Internal Server Error');
        }
    }
}