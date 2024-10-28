import { Role } from "./role";

export interface JwtPayload {
    subject: string;
    roles: Role[];
    firstName: string;
    lastName: string;
    userId: number;
    iat: number;
    exp: number;
}