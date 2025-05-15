import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { adminLog } from "@/services/Admin/Login/adminLogin";


// Validation schema using Zod
const loginSchema = z.object({
  id: z.string().min(4,"Id should be 4 characters long").max(4,"Id can't be more than 4 characters"),
  password: z.string()
  .min(8, "Password must be at least 6 characters long")
  .max(14, "Password must not exceed 10 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const AdminLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  
  const navigate = useNavigate();

  
// Validating data on the
  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login data submitted:", data);
    try {
      const response = await adminLog(data);
      const res = await response?.json();
      console.log(res.admin);
      localStorage.setItem("role", "admin");
      localStorage.setItem("info", JSON.stringify(res.admin))
      alert(`Server Resposne: ${res.message}`)
      navigate('/dashboard')

    } catch (error) {
      alert(`Login Failed: ${error}`);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-[0px_0px_500px_50px_rgba(54,171,214,0.4)] ">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Id</label>
          <input
            type="text"
            {...register("id")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-[rgba(54,171,214,0.8)] outline-none"
            placeholder="Enter your id"
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
    </div>
  );
};

export default AdminLoginForm;
