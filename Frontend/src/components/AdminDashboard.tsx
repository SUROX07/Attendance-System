import { getAdminData } from "@/services/Admin/Dashboard/adminData";
import Logout from "@/utils/Logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Subject {
  subjectCode: string;
  subjectName: string;
  _id: string;
}

interface AdminData {
  id: string;
  subjects: Subject[];
  _id: string;
}
interface AdminInfo{
  id:string;
  name:string;
  password:string;
  admin:boolean
}

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [adminInfo, setAdminInfo]= useState<AdminInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const info = localStorage.getItem("info");
      if (!info) return;
      console.log(info);
      const admin = JSON.parse(info);
      setAdminInfo(admin);
      const data = await getAdminData(admin.id);
      setAdminData(data);
    };

    fetchData();
  }, []);

  if (!adminData) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="py-8 px-10 text-white min-h-screen relative" style={{
      boxShadow: "inset 0 0 20px 10px rgba(54,171,214,0.4)",
    }}>
      <Logout />
      <h1 className="text-3xl font-bold mb-20">Welcome, {adminInfo?.name}</h1>
      <h1 className="text-xl font-bold mb-6">Subject List:</h1>
      <div className="grid grid-cols-1 gap-4">
        {adminData.subjects.map(subject => (
          <div
            key={subject._id}
            className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-4 text-white hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.3)] transition"
            onClick={() => navigate(`/admin/subject?code=${subject.subjectCode}&name=${subject.subjectName}`)}
          >
            <h2 className="text-xl font-semibold">{subject.subjectName}</h2>
            <p className="text-sm text-gray-300">{subject.subjectCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

