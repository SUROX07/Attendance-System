import Copyright from "@/components/Copyright";
import FeatureCards from "@/components/FeatureCards"
import { Navbar } from "@/components/Navbar"
import Typewriter from "@/components/TypeWriter"

const features = [
    { "title": "Fast Performance", "description": "Optimized for speed and efficiency." },
    { "title": "Fingerprint Authentication", "description": "Secure and accurate biometric verification for attendance marking." },
    { "title": "Real-Time Attendance Tracking", "description": "Instantly update and view student attendance records." },
    { "title": "Interactive Dashboard", "description": "User-friendly interface with visual charts and detailed reports." },
    { "title": "Secure Data Management", "description": "Encrypted and protected student attendance records stored in MongoDB." },
    { "title": "Automated Reporting", "description": "Generate attendance reports effortlessly for analysis and record-keeping." }
  ]
  ;

const Home = () => {
  return (
    <>
        <Navbar />
        <br />

        <div className="flex justify-center mt-10">
            <img src="src\assets\entire logo.png" alt="" className="w-[20vw]" />
        </div>

        <div className="flex justify-center text-white mt-6 text-lg ">
            <Typewriter texts={["Authenticate students effortlessly with secure fingerprint verification.", "Instantly view and manage student attendance with live updates.", "Visualize attendance trends with dynamic charts and reports.", "A reliable MERN stack solution for modern educational institutions."]} typingSpeed={50} deletingSpeed={20} />
        </div>

        <div className="flex justify-center items-center m-[10vw] mt-[15vh] border-6 rounded-sm border-[#36abd679]
        p-[6vw] shadow-[0px_0px_500px_1px_rgba(54,171,214,0.8)]">
            <FeatureCards features={features} />
        </div>

        <div >
            <Copyright />
        </div>


    </>

  )
}

export default Home