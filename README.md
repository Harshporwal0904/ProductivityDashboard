# ProDash — Personal Productivity Dashboard

ProDash is a modern, full-stack productivity application designed to help users manage tasks, capture notes, track daily goals, and visualize their productivity through beautiful analytics.

![Dashboard Preview](https://via.placeholder.com/1200x600/0f172a/6366f1?text=ProDash+Productivity+Dashboard)

## 🚀 Features

- **Authentication System**: Secure signup and login with JWT and bcrypt password hashing.
- **Task Manager**: Organize tasks with priorities, categories (Work, Study, Personal, etc.), and due dates.
- **Smart Notes**: Create, edit, and pin notes with custom color themes and search functionality.
- **Pomodoro Timer**: Stay focused with customizable work/break intervals and session logging.
- **Daily Goals Tracker**: Set daily objectives and track completion progress with streak counting.
- **Productivity Analytics**: Visualize your progress with interactive charts (Bar, Area, Pie) using Recharts.
- **Dark/Light Mode**: Beautifully designed UI with theme persistence.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS v4
- React Router v6
- Recharts (Data Visualization)
- Axios (API Communication)
- React Icons
- React Hot Toast (Notifications)

### Backend
- Node.js & Express.js
- MongoDB Atlas (Cloud Database)
- JSON Web Token (JWT) for Authentication
- Bcryptjs for Password Security

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone <repository-url>
cd personal-productivity-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
```
Run the server:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```text
personal-productivity-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth, Theme, and Data contexts
│   │   ├── pages/       # Page components
│   │   ├── services/    # API configuration
│   │   └── index.css    # Design system & styles
│   └── vite.config.js
├── backend/
│   ├── controllers/    # API logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth middleware
│   └── server.js       # Entry point
└── README.md
```

## 🔮 Future Enhancements
- Docker containerization for easy deployment.
- CI/CD pipeline using Jenkins/GitHub Actions.
- Cloud deployment on AWS/Vercel.

## 📄 License
This project is licensed under the MIT License.
