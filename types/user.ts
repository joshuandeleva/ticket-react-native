import { ApiResponse } from "./api"

export enum UserRole {
    Attendee = "attendee",
    Manager = "manager",
}

export type AuthResponse = ApiResponse<{user:User , token: string}>

export type User = {
    id: number ,
    email: string,
    firstName: string,
    lastName : string,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
}