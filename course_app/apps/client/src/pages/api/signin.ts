import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDb } from './db/mongoose';
import {Admin} from 'db'
 import jwt from 'jsonwebtoken'

connectToDb();

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
        const admin = await Admin.findOne({ username, password });
        if (admin) {
          const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
          res.json({ message: 'Logged in successfully', token });
        } else {
          res.status(403).json({ message: 'Invalid username or password' });
        }
    }else
    {
        res.status(403).json({message : "Invalid request type"});
    }
}
