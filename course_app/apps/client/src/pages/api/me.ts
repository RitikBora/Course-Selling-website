import { connectToDb } from './db/mongoose';
import {Request , Response , NextFunction } from 'express';
import {Admin} from 'db'

import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthenticateJwt } from './middlewares/authenticate';
type Data = {
  message ?: string,
  username ?: string
}

connectToDb();

export default async function handler(
  req: Request,
  res: Response
) {
    AuthenticateJwt(req, res , async () =>
    {
        if(req.method === "GET")
        {
            const admin = await Admin.findOne({ username: req.headers['user'] });
            if (!admin) {
            res.status(403).json({message: "Admin doesnt exist"})
            return
            }
            res.status(200).json({
                username: admin.username
            })
        }else
        {
            res.status(403).json({message : "Invalid request type"});
        }
    })
    
}
