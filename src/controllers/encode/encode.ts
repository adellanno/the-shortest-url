import { Request, Response } from "express";
import validator from "validator";
import { encodeUrl } from "../../services/encodeUrl";
import { getEncryptedUrl, storeEncryptedUrl } from "../../services/store/store";
import { EncryptedUrlObject } from "../../types";
import { transformResponse } from "../../utils/transformResponse";

export const encodeController = (req: Request, res: Response) => {
  try {
    const url: string = req.body.url;

    if (!url) {
      return res.status(400).send(transformResponse("A url must be provided"));

      // this validator provides sanitisation as well and if any suspicious characters are found we will return a 400 response
    } else if (!validator.isURL(url)) {
      return res
        .status(400)
        .send(transformResponse("The provided url is not valid"));
    }

    const encodedUrlObject: EncryptedUrlObject = encodeUrl(url);

    // hash collision prevention
    const verifiedUnqiqueUrlObject: EncryptedUrlObject =
      recursiveCollisionCheck(encodedUrlObject);

    const response = storeEncryptedUrl(verifiedUnqiqueUrlObject);

    if (response && !(response instanceof Boolean)) {
      return res.status(200).send(transformResponse("Success.", response));
    }

    return res
      .status(500)
      .send(
        transformResponse("An unexpected error occured, please try again.")
      );
  } catch (error) {
    return res
      .status(500)
      .send(
        transformResponse("An unexpected error occured, please try again.")
      );
  }
};

export const recursiveCollisionCheck = (
  encodedUrlObject: EncryptedUrlObject
): EncryptedUrlObject => {
  if (getEncryptedUrl(encodedUrlObject.id)) {
    const newEncodedUrlObject: EncryptedUrlObject = encodeUrl(
      encodedUrlObject.url
    );
    recursiveCollisionCheck(newEncodedUrlObject);
  }

  return encodedUrlObject;
};
