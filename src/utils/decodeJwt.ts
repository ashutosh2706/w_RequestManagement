import { JwtPayload } from "../types/jwtPayload";
import { jwtDecode } from "jwt-decode";
import { Role } from "../types/role";

export const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const decoded: any = jwtDecode(token);
        if (decoded) {
            return {
                subject: decoded.sub as string || '',
                roles: decoded.roles as Role[] || [],
                firstName: decoded.firstName || '',
                lastName: decoded.lastName || '',
                userId: decoded.userId || 0,
                iat: decoded.iat as number || 0,
                exp: decoded.exp as number || 0,
            };

        } else {
            throw new Error('Invalid token');
        }
        
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}