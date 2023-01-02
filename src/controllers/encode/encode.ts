import { Request, Response } from 'express';
import validator from 'validator';
import { encodeUrl, EncryptedUrlObject } from '../../services/encodeUrl'
import { getEncryptedUrl, storeEncryptedUrl } from '../../services/database/queries';

export const encodeController = ((req: Request, res: Response) => {
    try {
        const url: string = req.body.url

        if (!url) { 
            return res.status(400).send("A url must be provided")
             
        // this validator provides sanitisation as well and if any suspicious characters are found we will return a 400 response
        } else if (!validator.isURL(url)) {
            return res.status(400).send("The provided url is not valid")
        } 
        
        const encodedUrlObject: EncryptedUrlObject = encodeUrl(url)
    
        // hash collision prevention 
        const verifiedUnqiqueUrlObject: EncryptedUrlObject = recursiveCollisionCheck(encodedUrlObject)
        
        const storeResponse = storeEncryptedUrl(verifiedUnqiqueUrlObject)

        if (storeResponse) {  
           return res.status(200).send(storeResponse)
        } 
    
        return res.status(500).send('An unexpected error occured, please try again.')
    } catch (error) {
        // TODO return error as part of json response?
        return res.status(500).send('An unexpected error occured, please try again.')
    }
})

export const recursiveCollisionCheck = (encodedUrlObject: EncryptedUrlObject): EncryptedUrlObject  => {
    if (getEncryptedUrl(encodedUrlObject.id)) {
        const newEncodedUrlObject: EncryptedUrlObject = encodeUrl(encodedUrlObject.url)
        recursiveCollisionCheck(newEncodedUrlObject)
    } 

    return encodedUrlObject
}
