import About from "@/pages/About";
import { AdminLogin } from "@/pages/AdminLogin";
import { Dashboard } from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Register } from "@/pages/Register";
import { StudentList } from "@/pages/StudentList";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin/subject" element={<StudentList/>} />
        <Route path="/about" element={<About/>} />
        

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
