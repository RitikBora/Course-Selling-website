import SignupPage from "ui/components/SignupPage";

const BASE_URL = `http://localhost:3000/api/signup`
export default function Home() {
  return (
    
    <SignupPage url={BASE_URL}/>
  )
}
