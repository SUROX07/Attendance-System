# Attendance Management System 📘

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) to manage and track student attendance effectively. The application supports role-based dashboards for **students** and **admins/teachers**, with features like AI-based attendance planning suggestions, attendance tracking, and interactive data visualization.

---

## 🧩 Tech Stack

### Frontend
- **React** + **TypeScript**
- **Tailwind CSS** for utility-first styling
- **Recharts** for graph plotting
- **React Router DOM** for navigation
- **React Hook Form** + **Zod** for form validation
- **Google GenAI API** for AI-based attendance planning

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose** for database handling
- **REST API** architecture
- **CORS** and **dotenv** for environment configuration

---

## 📂 Project Structure

### Frontend
```
frontend/
├── components/       # Reusable UI components
├── pages/            # Route-based components (Login, Register, Dashboard, etc.)
├── services/         # API communication logic
├── api/              # Endpoint constants
├── routes/           # React Router setup
└── App.tsx
```

### Backend
```
backend/
├── controllers/      # Business logic (admin, student)
├── models/           # Mongoose schemas
├── routes/           # Express route handlers
└── index.js          # Entry point
```

---

## 🚀 Features

### ✅ Student Side
- Secure login and registration (only if `student_id` exists in `studentRecords`)
- View current attendance per subject
- Overall attendance graph with a benchmark line
- AI-based suggestion per subject to maintain attendance
- Responsive and visually intuitive dashboard

### ✅ Admin/Teacher Side
- View subjects they teach (based on `teacher.id`)
- Clickable subject cards to view list of students
- View individual student attendance by subject
- Attendance records sorted by section (`A`, `B`, etc.)

---

## 🔐 Authentication & Access Control

- **Students** must register using their valid `student_id`
- **Admins/Teachers** log in using their predefined credentials
- Role-based dashboards to separate functionalities

---

## 🧠 AI Integration (Student Dashboard)

- Uses **Google GenAI (`@google/genai`)**
- Provides personalized suggestions:
  - Minimum number of upcoming classes required to meet 60%
  - Warnings when attendance is below threshold
  - Positive reinforcement for good attendance

---

## 📦 Installation Guide

### Backend

```bash
cd backend
npm install
# Add .env with MONGO_URI and PORT
npm start
```

### Frontend

```bash
cd frontend
npm install
# (Optional) Add VITE_API_BASE or other environment configs
npm run dev
```

---

## 🌱 Database Structure

### `studentRecords` (MongoDB Collection)
```json
{
  "student_id": "01543210",
  "sem": 4,
  "dept": "IT",
  "sec": "A",
  "attendance": [
    {
      "subjectCode": "CS101",
      "subjectName": "Computer Science",
      "days_present": 22,
      "t_id": "A001"
    }
  ]
}
```

### `studentLogin` and `adminLogin`
Contain login credentials for students and admins.

---

## 📮 API Endpoints

### Students
- `GET /api/students/:student_id`
- `PUT /api/students/increment-attendance`
- `POST /api/students/register`
- `POST /api/students/login`

### Admin
- `POST /api/admin/login`
- `GET /api/admin/:id`
- `GET /api/admin/students-by-subject?code=CS101&t_id=A001`

---

## 🎯 Contribution & Customization

- Add teacher-side attendance increment or analytics
- Add export to CSV/PDF reports
- Add notifications/reminders
- Enhance AI responses using context memory

---

## 📜 License

This project is licensed for educational purposes and is open to contributions. Please credit the original author when forking or reusing in public repositories.

---

## 👨‍💻 Developed By

**Surajit Das**  
[LinkedIn](https://www.linkedin.com/in/surajitdas07/) • [GitHub](https://github.com/SUROX07) • [Instagram](https://www.instagram.com/s_u_r_o_x/)