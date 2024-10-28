export interface UserRequest {
    requestId: number,
    requestDate: string,
    title: string,
    status: string
}

export interface UserRequestFromApi {
    guardianName: string,
    phone: string,
    priority: string,
    requestDate: string,
    requestId: number,
    userId: number,
    status: string,
    title: string
    documentId: number
}