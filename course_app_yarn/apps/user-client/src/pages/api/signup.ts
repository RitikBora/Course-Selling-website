
 import type { NextApiRequest, NextApiResponse } from 'next'
 import {checkifDbConnected} from './db/mongoose';
 import {User} from 'db'
 import jwt from 'jsonwebtoken'
 
 checkifDbConnected();

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
        if(username === "" || password === "")
        {
          res.status(403).json({ message: 'Please enter both username and password correctly' });
        }
        const user = await User.findOne({ username })
        if (user) {
            res.status(403).json({ message: 'User already exists' });
          } else {
            const obj = { username: username, password: password };
            const newUser = new User(obj);
            newUser.save();
    
            const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'User created successfully', token });
          }

    }else
    {
        res.status(403).json({message : "Invalid request type"});
    }
}
