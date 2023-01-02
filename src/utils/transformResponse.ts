import { ShortUrl, ResponseObject } from "../types";

export const transformResponse = (message: string, data?: ShortUrl): ResponseObject => {
    return {
        message,
        data: data ? { ... data } : null
    }
}