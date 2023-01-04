import { v4 as uuidv4 } from "uuid";
import { EncodedUrlObject } from "../types";

export const encodeUrl = (url: string): EncodedUrlObject => {
  // generate random string, removing empty characters and limit length to 7 characters.
  const id = uuidv4().replace(/-/g, "").slice(0, 7);

  const encodedUrlObject: EncodedUrlObject = { id, url };

  return encodedUrlObject;
};
