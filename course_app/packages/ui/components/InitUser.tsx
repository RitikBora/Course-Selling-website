import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { userState } from "../../store/atoms/user";
export function InitUser(props : {
    url : string
}) {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get(props.url, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}
