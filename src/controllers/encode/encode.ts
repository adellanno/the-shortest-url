import { Request, Response } from 'express';
import validUrl from 'valid-url'

export const encodeUrl = ((req: Request, res: Response) => {
    const url: string = req.body.url

    if (!validUrl.isUri(url)){
        res.sendStatus(400)
    } 

    res.send("encodedUrl Controller")
})
