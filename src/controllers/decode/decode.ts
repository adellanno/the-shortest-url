import { Request, Response } from 'express';
import validUrl from 'valid-url';

export const decodeUrl = ((req: Request, res: Response) => {
    res.send("decodeUrl Controller")
})
