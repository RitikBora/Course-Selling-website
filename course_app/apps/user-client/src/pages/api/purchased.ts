import { checkifDbConnected} from './db/mongoose';
import {Course, User} from 'db'
import { AuthenticateJwt } from './middlewares/authenticate';
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
            const username = req.headers['user'];
          if(req.method === "GET")
          {
              const user = await User.findOne({username : username});
              let courses: typeof Course[] = [];

              const purchasedCourses = user.purchasedCourses;

              const coursePromises = purchasedCourses.map(async (courseId: object) => {
                let course_id = JSON.stringify(courseId);
                course_id = course_id.substring(1 , course_id.length - 1);
                const course = await Course.findById(course_id);
                return course;
              });
              try {
                const courses = await Promise.all(coursePromises);
                return res.status(200).json({ courses });
              } catch (error) {
                return res.status(500).json({ error: 'Failed to retrieve courses' });
              }
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
