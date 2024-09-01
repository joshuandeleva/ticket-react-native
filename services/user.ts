import { AuthResponse } from "@/types/user";
import { Api } from "./api";

export type AuthCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials  = AuthCredentials & {
    firstname: string;
    lastname: string;
}

async function login(authCredentials : AuthCredentials):Promise<AuthResponse> {
 return Api.post("/auth/login", authCredentials)
}

async function register(authCredentials : RegisterCredentials):Promise<AuthResponse> {
    return Api.post("/auth/register", authCredentials)
}

const userService  = {
    login,
     register
}

export {userService};