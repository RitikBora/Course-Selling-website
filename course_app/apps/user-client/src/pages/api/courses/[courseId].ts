import {Request , Response , NextFunction} from 'express'
import { AuthenticateJwt } from '../middlewares/authenticate';
import {Course , User} from 'db'


export default function handler(
  req: Request,
  res: Response
) {
    return new Promise((resolve , reject) =>
    {
      AuthenticateJwt(req , res , async() =>
      {
        try
        {
          let courseId = req.query.courseId as string;
          courseId = courseId?.slice(1);
          const username = req.headers['user'];

          if(req.method === "POST")
          {
            try
            {
              const course = await Course.findById(courseId);
              const user = await User.findOne({ username: username });
              
              user.purchasedCourses.push(course._id);
              user.save();
              res.status(200).send({message : "Course purchased successfully"});
            }catch(err)
            {
              res.status(500).send({message : "Error occured while purchasing course"});
            }
            
          }else
          {
            return res.status(403).json({message : "Invalid request type"});
          }
        }catch(err)
        {
          return res.status(500).send({message : "error occured while quering database"})
        }
      })
    })
}
