import { checkifDbConnected} from '../db/mongoose';
import {Course} from 'db'
import { AuthenticateJwt } from '../middlewares/authenticate';
import {Request , Response } from 'express';

checkifDbConnected();


export default async function handler(
  req: Request,
  res: Response
) {
    if(req.method === 'POST')
    {
        AuthenticateJwt(req , res , async () =>
        {
            const course = new Course(req.body);
            await course.save();
            return res.status(200).json({ message: 'Course created successfully', courseId: course.id });
        })
    }else if(req.method === "GET")
    {
        try
        {
          AuthenticateJwt(req , res , async() =>
          {
           
              const courses = await Course.find({});
              return res.status(200).json({courses});
          })
        }catch(err)
        {
          return res.status(200).send({message : "error occured while fetching courses"});
        }
    }else
    {
        return res.status(403).json({message : "Invalid request type"});
    }
}
