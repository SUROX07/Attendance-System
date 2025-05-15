
import { getStudentsBySubject } from "@/services/Admin/Dashboard/studentList";
import Logout from "@/utils/Logout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TOTAL_CLASSES = 30; // arbitrary max class count

interface Student {
  student_id: string;
  sec: string;
  attendance: {
    subjectCode: string;
    days_present: number;
  }[];
}

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const subjectCode = query.get("code");
  const subjectName = query.get("name");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!subjectCode) return <div className="text-white text-center">Error....</div>;
      const data = await getStudentsBySubject(subjectCode);
      setStudents(data);
    };
    fetchData();
  }, [subjectCode]);

  const getAttendancePercentage = (student: Student) => {
    const subject = student.attendance.find(a => a.subjectCode === subjectCode);
    return subject ? ((subject.days_present / TOTAL_CLASSES) * 100).toFixed(2) : "0.00";
  };

  const navigateToDashboard = ()=>{
    navigate('/dashboard')
  }

  const sortedStudents = [...students].sort((a, b) => a.sec.localeCompare(b.sec));

  return (
    <div className=" text-white min-h-screen p-15 relative" style={{
      boxShadow: "inset 0 0 20px 10px rgba(54,171,214,0.4)",
    }}>
      <button onClick={navigateToDashboard} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition absolute right-[150px]">
        Dashboard
      </button>
      <Logout />
      <h1 className="text-3xl font-bold mb-4">{subjectName} ({subjectCode})</h1>
      <div className="space-y-4 mt-10 ">
        {sortedStudents.map(student => (
          <div
            key={student.student_id}
            // className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow hover:shadow-lg transition flex gap-10 justify-evenly"
            className={`" backdrop-blur-md border  p-4 rounded-xl shadow hover:shadow-lg transition flex gap-10 justify-evenly
              ${parseInt(getAttendancePercentage(student)) < 60
                ? "border-2 border-red-500 bg-white/10"
                : "border border-white/20 bg-white/10"}
            `}
          >
            <p><strong>Student ID:</strong> {student.student_id}</p>
            <p><strong>Section:</strong> {student.sec}</p>
            <p><strong>Days Present:</strong> {
                  student.attendance.find(a => a.subjectCode === subjectCode)?.days_present || 0
                }/{TOTAL_CLASSES}</p>
            <p><strong>Attendance Percentage:</strong> {getAttendancePercentage(student)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};