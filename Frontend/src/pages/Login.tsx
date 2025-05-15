import React from "react";
import StudentLoginForm from "../components/StudentLoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <StudentLoginForm />
    </div>
  );
};

export default Login;
