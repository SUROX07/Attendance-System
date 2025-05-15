import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { studentReg } from "@/services/Student/Register/studentReg";

// Validation Schema using Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    student_id: z.string().min(8,"Student ID should be 8 characters").max(8, "Student ID should be 8 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must not exceed 10 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[\W_]/, "Password must contain at least one symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



const StudentRegisterForm = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });


  type RegisterFormData = {
    name: string;
    student_id: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const onSubmit = async (data:RegisterFormData) => {
    console.log(data);
     const response = await studentReg(data)
     const result = await response?.json();
     if(response?.status==200){
      alert(result.message);
      navigate('/login')
     }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-[0px_0px_500px_50px_rgba(54,171,214,0.4)]">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Student id */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Student ID</label>
          <input
            type="text"
            {...register("student_id")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your Student ID"
          />
          {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        

        {/* Submit Button */}
        <button type="submit" className="w-full mt-4 bg-[rgba(54,171,214,0.8)] text-white py-2 rounded-lg hover:bg-[rgba(54,171,214,1)] transition">
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-gray-400 mt-4">
        Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default StudentRegisterForm;
