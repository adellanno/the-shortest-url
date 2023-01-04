export type ResponseObject = {
  message: string;
  data: ShortUrl | CreateShortUrlResponse | null;
};

export type EncodedUrlObject = {
  id: string;
  url: string;
};

export type ShortUrl = {
  id: string;
  url: string;
  shortUrl: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: number;
};

export type CreateShortUrlResponse = {
  id: string;
  url: string;
  shortUrl: string;
}