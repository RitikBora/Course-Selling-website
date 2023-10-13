import SigninPage from "ui/components/SigninPage";
import { BASE_URL } from "../../config";

// const BASE_URL = `http://localhost:3000/api/signin`
export default function Home() {
  return (
    <SigninPage url={BASE_URL + "/api/signin"}/>
  )
}
