import type { NextApiRequest, NextApiResponse } from 'next'
import {checkifDbConnected} from './db/mongoose';
import {User} from 'db'
 import jwt from 'jsonwebtoken'

checkifDbConnected();

type Data = {
    message?: string,
    token? : string
  }

const SECRET = "#S3CR3T#";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method === 'POST')
    {
        const { username, password } = req.body;
        // db calls
        const user = await User.findOne({ username, password });
        if (user) {
          const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
          res.json({ message: 'Logged in successfully', token });
        } else {
          res.status(403).json({ message: 'Invalid username or password' });
        }
    }else
    {
        res.status(403).json({message : "Invalid request type"});
    }
}
