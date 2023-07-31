import axios from "./axios";

export type Category = 
{
    id: string,
    title: string,
    link: string,
    description: string,
    layers: string
}

export function getCategories()
{
    return axios.get<Category[]>('/categories').then(res => res.data)
}