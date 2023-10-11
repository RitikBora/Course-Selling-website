
 import type { NextApiRequest, NextApiResponse } from 'next'
 import { connectToDb } from './db/mongoose';
 import {Admin} from 'db'
 import jwt from 'jsonwebtoken'
 
 connectToDb();

type Data = {
  message?: string,
  token ? : string
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
        const admin = await Admin.findOne({ username })
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
          } else {
            const obj = { username: username, password: password };
            const newAdmin = new Admin(obj);
            newAdmin.save();
    
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token });
          }

    }else
    {
        res.status(403).json({message : "Invalid request type"});
    }
}
