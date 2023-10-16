import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import {useSetRecoilState} from "recoil";
import {userState} from "../../store/atoms/user";

function SigninPage(props : {
    url : string
}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign in below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
                    }}
                    required={true}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required={true}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>
                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        try
                        {
                            const res = await axios.post(props.url, {
                                username: email,
                                password: password
                            }, {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            });
                            const data = res.data;
                            localStorage.setItem("token", data.token);
                            // window.location = "/"
                            setUser({
                                userEmail: email,
                                isLoading: false
                            })
                            router.push("/courses")

                        }catch(err : any)
                        {
                           alert(err.response.data.message);
                        }
                    }}

                > Signin</Button>
            </Card>
        </div>
    </div>
}

export default SigninPage;