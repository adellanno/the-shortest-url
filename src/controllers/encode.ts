import { Request, Response } from 'express';

export const encodeUrl = ((req: Request, res: Response) => {
    res.send("encodedUrl Controller")
})
