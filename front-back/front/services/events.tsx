import axios from "./axios";


export type Category = 
{
    title: string,
    description: string
}

export type Source = 
{
    id: string,
    url: string
}

export type Geometry = 
{
    type: string,
    coordinates: []
}

export type Event = {
    title:string,
    description:string,
    link:string,
    closed:string,
    date: Date,
    magnitudeValue: number,
    magnitudeUnit: string,
    categories: Category[],
    sources: Source[],
    geometry: Geometry[]
}

export function getEvents()
{
    return axios.get<Event[]>('/events').then(res => res.data)
}

export function getEventCategory(category: string)
{
    return axios.get<Event[]>(`/events/${category}`).then(res => res.data)
}