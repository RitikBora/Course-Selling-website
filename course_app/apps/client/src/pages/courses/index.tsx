import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Loading } from "ui";
import { courseState } from "store";
import {useResetRecoilState} from "recoil"

interface Course {
    title : string,
    description : string,
    imageLink : string,
    _id: string  
}

type SetCourses = React.Dispatch<React.SetStateAction<Course[]>>;

function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const resetCourseState = useResetRecoilState(courseState);
    const [isCourseLoading , setIsCourseLoading] = useState(true);
    const router = useRouter();

    const init = async () => {
        const token = localStorage.getItem('token');

        if(token)
        {
            const response = await axios.get(BASE_URL + "/api/courses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setCourses(response.data.courses);
            setIsCourseLoading(false);
            resetCourseState();
        }else
        {
            router.push('/');
        }
    }

    useEffect(() => {
        init();
    }, []);
    
    return <> 
        {isCourseLoading === true ? <>
            <Loading/>
        </>
        : <>
        {
            courses.length !== 0 ? 
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map(course => {
                return <Course course={course} setCourses={setCourses} key={course._id}/>}
            )}
            </div> :
            <div>
                <h3>No Courses added yet</h3>
            </div>
        }
        </>
    }
    </>
}

export function Course(props :  {
    course : Course,
    setCourses : SetCourses
}) {
    const router = useRouter();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <img src={props.course.imageLink} style={{width: 300 , height:170}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("courses/:" + props.course._id);
            }}>Edit</Button> 
            <Button variant="contained" style={{marginLeft: 15}}size="large" onClick={async () => {
                const response = await axios.post(BASE_URL + "/api/courses/:" + props.course._id , {} , {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }    
                })
               props.setCourses(response.data.courses);
            }}>Delete</Button>
        </div>
    </Card>

}

export default Courses;