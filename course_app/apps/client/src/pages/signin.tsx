import SigninPage from "ui/components/SigninPage";
import { BASE_URL } from "../../config";

export default function Home() {
  return (
    <SigninPage url={BASE_URL + "/api/signin"}/>
  )
}
