import { ApiResponse } from "./api"

export type EventResponse = ApiResponse<Event>
export type EventListResponse = ApiResponse<Event[]>


export type Event  = {
    id: number ,
    name: string,
    location: string,
    date: string,
    totalTicketsPurchased: number,
    totalTicketsEntered: number,
    createdAt: string
    updatedAt: string,
}