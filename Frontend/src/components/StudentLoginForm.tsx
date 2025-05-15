import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { studentLog } from "@/services/Student/Login/studentLogin";

// Validation schema using Zod
const loginSchema = z.object({
  id: z.string().min(8,"ID should be 8 characters long").max(8,"ID should be 8 characters long"),
  password: z.string()
  .min(6, "Password must be at least 6 characters long")
  .max(10, "Password must not exceed 10 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const StudentLoginForm: React.FC = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login data submitted:", data);
     console.log(data);
         const response = await studentLog(data)
         const result = await response?.json();
         if(response?.status==200){
          alert(result.message);
          localStorage.setItem('role','stud');
          localStorage.setItem('info',JSON.stringify(result.student));
          console.log(typeof localStorage.getItem('info'));
          navigate('/dashboard')
         }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-[0px_0px_500px_50px_rgba(54,171,214,0.4)] ">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Student id</label>
          <input
            type="text"
            {...register("id")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-[rgba(54,171,214,0.8)] outline-none"
            placeholder="Enter your email"
          />
          {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-[rgba(54,171,214,0.8)] outline-none"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full mt-4 bg-[rgba(54,171,214,0.8)] text-white py-2 rounded-lg hover:bg-[rgba(54,171,214,1)] transition">
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-gray-400 mt-4">
        Not registered? <Link to="/register" className="text-blue-400 hover:underline">Create an account</Link>
      </p>
    </div>
  );
};

export default StudentLoginForm;
