import {checkifDbConnected} from '../db/mongoose';
import {Course} from 'db'
import { AuthenticateJwt } from '../middlewares/authenticate';
import {Request , Response } from 'express';

checkifDbConnected();

export default async function handler(
  req: Request,
  res: Response
) {
    if(req.method === 'PUT')
    {
        AuthenticateJwt(req , res , async () =>
        {
         try
         {
          let courseId = req.query.courseId as string;
          courseId = courseId?.slice(1);
          
         const newCourse = {
          title : req.body.title,
          description : req.body.description,
          price : req.body.price,
          image : req.body.image,
          published : req.body.published
         }
          const course = await Course.findByIdAndUpdate(courseId, newCourse, { new: true });
          if (course) {
            return res.json({ message: 'Course updated successfully' });
          } else {
            return res.status(404).json({ message: 'Course not found' });
          }
         }catch(err)
         {
          return res.status(404).json({ message: 'Error occured while editing course'});
         }
        })
    }else if(req.method === "GET")
    {
        AuthenticateJwt(req , res , async() =>
        {
           try
           {
            let courseId = req.query.courseId as string;
            courseId = courseId?.slice(1);
            const course = await Course.findById(courseId);
            return res.status(200).json({ course });
           }catch(err)
           {
              // console.log(err);
             return res.status(200).send({message : "error occured while fetching courses"});
           }
        })
    }else
    {
        return res.status(403).json({message : "Invalid request type"});
    }
}
