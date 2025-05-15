import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getStudentData } from '@/services/Student/Dashboard/student';
import AttendanceGraph from './AttendanceGraph';
import Logout from '@/utils/Logout';
import { SubjectCard } from './ui/SubjectCard';



const totalDays = 30; //each subject's max classes

// const SubjectCard = ({ subject }) => {
//   const percentage = ((subject.days_present / totalDays) * 100).toFixed(2);
//   return (
//     <Card className={`" bg-white/10 backdrop-blur-md border  border-white shadow-md rounded-2xl p-4 text-white hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)] 
//     ${parseInt(percentage)>60?
//     "border-white hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]" 
//     : "border-red-500 hover:shadow-[0px_0px_15px_5px_rgba(255,0,0,0.5)]" } "`}>
//       <CardContent>
//         <h2 className="text-xl font-semibold">{subject.subjectName} ({subject.subjectCode})</h2>
//         <p>Days Present: {subject.days_present}</p>
//         <p>Attendance: {percentage}%</p>
//       </CardContent>
//     </Card>
//   );
// };

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [studentData, setStudentData] = useState({});

//Fetching data of current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = localStorage.getItem('info');
        if (!info) return;
  
        const student = JSON.parse(info);
        setStudentInfo(student); // Save in state for later use
  
        const sampleData = await getStudentData(student.student_id);
        setStudentData(sampleData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchData();
  }, []);

  if (!studentData || !studentData?.attendance){
    console.log("Loading")
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const totalPresent = studentData?.attendance?.reduce((acc, subj) => acc + subj.days_present, 0);
  const maxPossible = totalDays * studentData.attendance.length;
  const currentPercentage = ((totalPresent / maxPossible) * 100);


  return (
    <div className="py-8 px-10 text-white h-screen relative" style={{
    }}>
      <Logout />
      <h1 className="text-3xl font-bold">{studentInfo.name}</h1>
      <h5 className='mb-6'>(id: {studentInfo.student_id})</h5>

      <div className=" bg-white/10 border border-white backdrop-blur-md rounded-2xl p-4 mb-8 ">
        <AttendanceGraph currAttendance = {currentPercentage}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {studentData.attendance.map(subject => (
          <SubjectCard key={subject._id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
