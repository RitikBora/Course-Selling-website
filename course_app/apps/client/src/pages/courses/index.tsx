import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const BASE_URL = `http://localhost:3000/api/courses`;

interface Course {
    title : string,
    description : string,
    imageLink : string,
    _id: string  
}

function Courses() {
    const [courses, setCourses] = useState([]);
    const router = useRouter();

    const init = async () => {
        const token = localStorage.getItem('token');

        if(token)
        {
            const response = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setCourses(response.data.courses)
        }else
        {
            router.push('/signin');
        }
    }

    useEffect(() => {
        init();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

export function Course(props : {
    course : Course
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
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("courses/:" + props.course._id);
            }}>Edit</Button>
        </div>
    </Card>

}

export default Courses;