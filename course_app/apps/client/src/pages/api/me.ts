import { checkifDbConnected} from './db/mongoose';
import {Request , Response} from 'express';
import {Admin} from 'db'

import { AuthenticateJwt } from './middlewares/authenticate';


checkifDbConnected();

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
