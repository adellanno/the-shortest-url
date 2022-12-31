import { Request, Response } from 'express';

export const decodeUrl = ((req: Request, res: Response) => {
    res.send("decodeUrl Controller")
})
