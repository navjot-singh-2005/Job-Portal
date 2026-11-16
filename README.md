# 💼 Job Portal — Full-Stack Career & Recruitment Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Frontend%20App-brightgreen?logo=render)](https://job-portal-hf5c.onrender.com/)
[![API Backend](https://img.shields.io/badge/API-Live%20Backend-blue?logo=render)](https://job-portal-backend-kw91.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-navjot--singh--2005%2FJob--Portal-181717?logo=github)](https://github.com/navjot-singh-2005/Job-Portal)
[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An end-to-end modern **Job Portal** platform designed to connect job seekers with top employers. Featuring dedicated portals for **Candidates**, **Recruiters/Admins**, and a curated **Interview Preparation Hub**.

---

## 🚀 Key Features

### 👤 Candidate Portal (`/frontend`)
- **Job Search & Exploration**: Find jobs by keyword, company, job role, and location.
- **Job Details & Application**: Detailed job descriptions, requirements, and streamlined application workflow.
- **Interview Preparation**: Practice with curated interview questions organized by **Target Company** and **Job Role**.
- **User Authentication**: Secure Sign-Up and Login for job seekers.
- **Bookmarks & Saved Jobs**: Save interesting jobs to review and apply later.
- **Candidate Profile**: Manage personal details, resume, and application history.

### 🏢 Recruiter & Admin Panel (`/admin`)
- **Interactive Dashboard**: Real-time overview of active job listings and incoming applications.
- **Job Posting & Management**: Create, edit, publish, and delete job openings.
- **Applicant Tracking**: Review candidate profiles and manage applicant statuses.
- **Question Management**: Add and curate interview questions by specific companies and roles.
- **Company Profiles**: Manage company branding and information.

### ⚙️ Backend Services (`/backend`)
- **RESTful API**: Clean API architecture built with Node.js and Express.
- **Authentication & User Management**: Secure handling of candidate and recruiter accounts.
- **Automated Email Service**: Application confirmations and interview notifications.
- **Data Models**: Structured schemas for jobs, users, applicants, and interview resources.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router DOM, Tailwind CSS, Vite |
| **Admin Panel** | React 19, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / Mongoose |
| **Utilities** | Nodemailer / Email Service, ESLint |

---

## 📁 Project Structure

```bash
Job-Portal/
├── admin/                 # Recruiter & Admin Dashboard (React + Vite)
│   ├── src/
│   │   ├── components/    # Admin views (AddJobs, Applicants, Questions, Dashboard)
│   │   ├── assets/        # Media and static assets
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Backend API Server (Node.js + Express)
│   ├── controllers/       # Controller logic (job, user, interview)
│   ├── models/            # Database models & schemas
│   └── utils/             # Helper utilities and email services
│
├── frontend/              # Candidate-facing Web App (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/    # Pages (FindJob, Career, CompanyPage, InterviewQuestion)
│   │   ├── assets/        # Media, images, and banners
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚡ Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/navjot-singh-2005/Job-Portal.git
cd Job-Portal
```

### 2. Setup & Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
> The candidate portal will start at `http://localhost:5173`

### 3. Setup & Run the Admin Panel
```bash
cd ../admin
npm install
npm run dev
```
> The admin portal will run on a separate local port (e.g., `http://localhost:5174`)

### 4. Setup & Run the Backend
```bash
cd ../backend
npm install
npm run dev # or node server.js / npm start
```

---

## 📬 Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Navjot Singh**
- GitHub: [@navjot-singh-2005](https://github.com/navjot-singh-2005)
- Repository: [Job-Portal](https://github.com/navjot-singh-2005/Job-Portal)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
