import { checkifDbConnected} from './db/mongoose';
import {Request , Response , NextFunction } from 'express';
import {Admin} from 'db'

import { AuthenticateJwt } from './middlewares/authenticate';

checkifDbConnected();

export default async function handler(
  req: Request,
  res: Response
) {
    return new Promise ((resolve , reject) =>
    {
        AuthenticateJwt(req, res , async () =>
        {
            if(req.method === "GET")
            {
                const admin = await Admin.findOne({ username: req.headers['user'] });
                if (!admin) {
                return res.status(403).json({message: "Admin doesnt exist"})
                
                }
                return res.status(200).json({
                    username: admin.username
                })
            }else
            {
                return res.status(403).json({message : "Invalid request type"});
            }
        })
    })
}
