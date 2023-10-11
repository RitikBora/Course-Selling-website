import { connectToDb } from '../db/mongoose';
import {Course} from 'db'
import { AuthenticateJwt } from '../middlewares/authenticate';
import {Request , Response } from 'express';

connectToDb();

type Data = {
    message?: string,
    courseId : string
  }

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
            res.status(200).json({ message: 'Course created successfully', courseId: course.id });
        })
    }else if(req.method === "GET")
    {
        AuthenticateJwt(req , res , async() =>
        {
           try
           {
            const courses = await Course.find({});
            res.json({ courses });
           }catch(err)
           {
             res.status(200).send({message : "error occured while fetching courses"});
           }
        })
    }else
    {
        res.status(403).json({message : "Invalid request type"});
    }
}
