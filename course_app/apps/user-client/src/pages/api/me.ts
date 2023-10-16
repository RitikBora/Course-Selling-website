import { checkifDbConnected} from './db/mongoose';
import {Request , Response , NextFunction } from 'express';
import {User} from 'db'

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
                const user = await User.findOne({ username: req.headers['user'] });
                if (!user) {
                return res.status(403).json({message: "User doesnt exist"})
                
                }
                return res.status(200).json({
                    username: user.username
                })
            }else
            {
                return res.status(403).json({message : "Invalid request type"});
            }
        })
    })
}
