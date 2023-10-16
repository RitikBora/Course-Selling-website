import SignupPage from "ui/components/SignupPage";
import { BASE_URL } from "../../config";

export default function Home() {
  return (
    
    <SignupPage url={BASE_URL + "/api/signup"}/>
  )
}
