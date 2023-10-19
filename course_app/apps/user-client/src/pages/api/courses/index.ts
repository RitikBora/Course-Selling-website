import { checkifDbConnected} from '../db/mongoose';
import {Course} from 'db'
import { AuthenticateJwt } from '../middlewares/authenticate';
import {Request , Response } from 'express';

checkifDbConnected();


export default async function handler(
  req: Request,
  res: Response
) {
    return new Promise((resolve , reject) =>
    {
      AuthenticateJwt(req , res , async() =>
      {
        try
        {
          if(req.method === "GET")
          {
              const courses = await Course.find({});
              return res.status(200).json({courses});
          }else
          {
            return res.status(403).json({message : "Invalid request type"});
          }
        }catch(err)
        {
          return res.status(500).send({message : "error occured while quering courses table"})
        }
      })
    })
}
