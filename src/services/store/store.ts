import Nodecache from "./database";
import { EncryptedUrlObject, ShortUrl, CreateShortUrlResponse } from "../../types";

// abstraction of a database layer allowing this faux database (using node-cache) to be easily swapped in future

export const storeEncryptedUrl = (
  EncryptedUrlObject: EncryptedUrlObject
): CreateShortUrlResponse | Boolean => {
  const { id, url } = EncryptedUrlObject;

  if (!id || !url) return false;

  const shortUrl: ShortUrl = {
    id,
    url,
    shortUrl: `https://shorturl.com/${id}`,
    isActive: true,
    isDeleted: false,
    createdAt: Math.floor(Date.now() / 1000),
  };

  // utilising the expiry is one means of preventing hash collisions
  const response = Nodecache.set(id, shortUrl, 10000);

  if (!response) return false;

  const createShortUrlResponse: CreateShortUrlResponse ={
    id: shortUrl.id,
    url: shortUrl.url,
    shortUrl: `https://shorturl.com/${id}`
  }

  return createShortUrlResponse;
};

export const getEncryptedUrl = (id: string): ShortUrl | null => {
  if (!id) return null;

  const shortUrl: ShortUrl = Nodecache.get(id) as ShortUrl;

  if (!shortUrl) return null;

  return shortUrl;
};
