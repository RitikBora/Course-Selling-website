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
          const adminName = req.headers['user'];
          if(req.method === "POST")
          {
            const newCourse = {
              title : req.body.title,
              description : req.body.description,
              price : req.body.price,
              imageLink : req.body.imageLink,
              published : req.body.published,
              adminName :adminName
            }
            const course = new Course(newCourse);
            await course.save();
            return res.status(200).json({ message: 'Course created successfully', courseId: course.id });

          }else if(req.method === "GET")
          {
              const courses = await Course.find({adminName : adminName});
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
