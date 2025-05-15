
import AdminDashboard from "@/components/AdminDashboard"
import StudentDashboard from "@/components/StudentDashboard"
import { Link} from "react-router-dom"

export const Dashboard = () => {
  if(localStorage.getItem("role")=="stud") return <div> <StudentDashboard/> </div>
  if(localStorage.getItem("role")=="admin") return <div> <AdminDashboard /> </div>
  else return (
    <div className="text-center flex flex-col items-center justify-center h-screen" style={{
      boxShadow: "inset 0 0 20px 10px rgba(54,171,214,0.4)",
    }}>
      <div className="text-center flex flex-col justify-center border-2 border-s-white w-max p-5 rounded-2xl gap-2">
      <h1 className="text-xl">You are not Logged in. Kindly Login to continue...</h1>
      <ul>
        <li><Link to="/admin-login" className="hover:text-[rgba(54,171,214,1)] underline underline-offset-2">Admin Login</Link></li>
        <li><Link to="/login" className="hover:text-[rgba(54,171,214,1)] underline underline-offset-2">Student Login</Link></li>
      </ul>
      </div>
    </div>
  )
}
