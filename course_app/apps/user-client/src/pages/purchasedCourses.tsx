import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { BASE_URL } from "../../config";
import { Loading } from "ui";

interface Course {
    title : string,
    description : string,
    imageLink : string,
    _id: string  
}

type SetCourses = React.Dispatch<React.SetStateAction<Course[]>>;

function PurchasedCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isCourseLoading , setIsCourseLoading] = useState(true);
    const router = useRouter();

    const init = async () => {
        const token = localStorage.getItem('token');

        if(token)
        {
            const response = await axios.get(BASE_URL + "/api/purchased", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setCourses(response.data.courses);
            setIsCourseLoading(false);
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
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map(course => {
                return <Course course={course} setCourses={setCourses}/>}
            )}
            </div>
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
        <img src={props.course.imageLink} style={{width: 300}} ></img>
    </Card>

}

export default PurchasedCourses;