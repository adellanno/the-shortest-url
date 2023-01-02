import { Request, Response } from 'express';
import validator from 'validator';
import { getEncryptedUrl } from '../../services/database/queries';

export const decodeController = ((req: Request, res: Response) => {
    try {
        const encryptedUrl: string = req.query.encryptedUrl as string;

        if (!encryptedUrl) { 
            return res.status(400).send("A url must be provided")
        // this validator provides sanitisation as well and if any suspicious characters are found we will return a 400 response
        } else if (!validator.isURL(encryptedUrl)) {
            return res.status(400).send("The provided url is not valid")
        } 

        const path = new URL(encryptedUrl).pathname
        
        if (!path || path === '/') {
            return res.status(400).send("The provided url is not valid")
        }

        const shortUrl = getEncryptedUrl(path)

        if (!shortUrl) {    
            return res.status(404).send("The page you are looking for might have been removed, had its name changed or is unavailable.")
        }

        return res.status(200).send(shortUrl)
    } catch (error) {
        console.log(error)
        return res.status(500).send('An unexpected error occured, please try again.')
    }
})
