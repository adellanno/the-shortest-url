import { Request, Response } from 'express';
import validUrl from 'valid-url'
import { encodeUrl, EncryptedUrlObject } from '../../services/encodeUrl'
import { getEncryptedUrl, storeEncryptedUrl } from '../../services/database/queries';

export const encodeController = ((req: Request, res: Response) => {
    const url: string = req.body.url

    if (!url) { 
        res.status(400).send("A url must be provided")
    // this validator provides sanitisation as well if any erroneous characters are found we will return a 400 response
    } else if (!validUrl.isUri(url)) {
        res.status(400).send("The provided url is not valid")
    } 

    const encodedUrlObject: EncryptedUrlObject = encodeUrl(url)

    // hash collision prevention 
    const verifiedUnqiqueUrlObject: EncryptedUrlObject = recursiveCollisionCheck(encodedUrlObject)
    
    storeEncryptedUrl(verifiedUnqiqueUrlObject)

    // TODO all responses MUST be JSON 
    res.send("encodedUrl Controller")
})

export const recursiveCollisionCheck = (encodedUrlObject: EncryptedUrlObject): EncryptedUrlObject  => {
    if (getEncryptedUrl(encodedUrlObject.id)) {
        const newEncodedUrlObject: EncryptedUrlObject = encodeUrl(encodedUrlObject.url)
        recursiveCollisionCheck(newEncodedUrlObject)
    } 

    return encodedUrlObject
}
