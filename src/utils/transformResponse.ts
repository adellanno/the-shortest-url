import { ShortUrl, ResponseObject, CreateShortUrlResponse} from "../types";

export const transformResponse = (
  message: string,
  data?: ShortUrl | CreateShortUrlResponse
): ResponseObject => {
  return {
    message,
    data: data ? { ...data } : null,
  };
};
