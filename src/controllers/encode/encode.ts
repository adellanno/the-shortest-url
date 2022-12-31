import { Request, Response } from 'express';
import validUrl from 'valid-url'

export const encodeController = ((req: Request, res: Response) => {
    const url: string = req.body.url

    if (!url) { 
        res.status(400).send("A url must be provided")
    } else if (!validUrl.isUri(url)) {
        res.status(400).send("The provided url is not valid")
    } 

    res.send("encodedUrl Controller")
})
