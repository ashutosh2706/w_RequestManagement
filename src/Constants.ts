export const ROLES = {
    USER: "ROLE_USER",
    ADMIN: "ROLE_ADMIN",
};

export const ERROR_MESSAGES = {
    INVALID_TOKEN: "Invalid token",
    UNAUTHORIZED: "Unauthorized access",
    NOT_FOUND: "Resource not found",
};

export const REQUEST_STATUS = {
    REQUEST_PENDING: "Pending",
    REQUEST_APPROVED: "Approved",
    REQUEST_REJECTED: "Rejected",
}

export const REQUEST_PRIORITY = {
    PRIORITY_HIGH: "High",
    PRIORITY_NORM: "Normal",
    PRIORITY_LOW: "Low",
}

export enum PriorityCode {
    PRIORITY_HIGH = 1,
    PRIORITY_NORM = 2,
    PRIORITY_LOW = 3,
}

export enum StatusCode {
    STATUS_PENDING = 1,
    STATUS_APPROVED = 2,
    STATUS_REJECTED = 3,
}

export enum UserRoles {
    ROLE_USER = 1,
    ROLE_ADMIN = 2,
}