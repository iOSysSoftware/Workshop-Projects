export interface UsernameAvailableResponse {
    error: boolean;
    message: string;
}

export interface RegistrationRequest {
    username: string;
    password: string;
}

export interface RegistrationResponse {
    error: boolean;
    message?: string;
    userId: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    error: boolean;
    message?: string;
    userId: string;
}

export interface UserSessionCheckResponse {
    error: boolean;
    username?: string;
    message: string;
}

export interface IncomingMessage {
    error: boolean;
    message: string;
}
