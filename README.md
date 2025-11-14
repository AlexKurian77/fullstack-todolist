# Todo App

This is my submission for the IntelliSQR Full Stack Assignment.  
I built a complete Todo application with authentication and full CRUD using React (TypeScript) on the frontend and Node.js + Express on the backend.

Everything is connected through MongoDB Atlas.

---

## Features

### Authentication
- User Signup  
- User Login  
- Forgot Password  
- Reset Password  
- JWT-based authentication  
- Protected routes on frontend  
- Passwords hashed with bcrypt  

### Todo Management
- Create Todo  
- Update Todo  
- Mark Todo as complete/incomplete  
- Delete Todo  
- List all todos for the logged-in user  

### Backend Extras
- Proper error handling  
- All backend errors are logged into a separate MongoDB collection (`logs`)  
- Clean folder structure with controllers, routes, middleware, and models  

### Frontend Extras
- React + TypeScript  
- Zustand for global auth state  
- React Query for data fetching + caching  
- React Hook Form + Zod validation  
- Clean UI with custom components  
- React Router for page navigation  

---

## Tech Stack

**Frontend:**  
- React (TypeScript)  
- Zustand  
- React Query  
- React Hook Form  
- Zod  
- Axios  
- Vite  

**Backend:**  
- Node.js + Express (TypeScript)  
- Mongoose  
- JWT  
- Bcrypt  
- Dotenv  

**Database:**  
- MongoDB Atlas  

---

## Folder Structure

### Frontend
```

frontend/
src/
api/
components/
hooks/
pages/
schemas/
store/
App.tsx
main.tsx

```

### Backend
```

backend/
src/
config/
controllers/
middleware/
models/
routes/
utils/
app.ts
server.ts

```

---

## How to Run the Project

### 1. Clone the repo
```

git clone https://github.com/AlexKurian77/intellisqr-todolist.git
cd intellisqr-todolist

```

---

### 2. Backend Setup
```

cd backend
npm install

```

Create a `.env` file inside the backend folder:

```

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

```

Start backend:
```

npm run dev

```

---

### 3. Frontend Setup
```

cd frontend
npm install
npm run dev

```

Frontend will start at:
```

http://localhost:5173

```

Backend runs at:
```

http://localhost:5000

```

---

## 🎥 Demo Video

Link to demo (Google Drive):  
**https://drive.google.com/drive/folders/17O6Kyn93dHxrkmPWuVCqOo9R4EwB7hhw?usp=sharing**

The video includes:
- Adding a todo  
- Editing a todo  
- Marking todo complete/incomplete  
- Deleting a todo  

---

## Assumptions Made

- For reset password, instead of sending email, I return a reset token directly in the response so the frontend can navigate to the reset page.  
- Error logs are stored in a separate `logs` collection using a middleware that saves every error message and path.  
- Only logged-in users can access /todos routes.  

---

## ✅ Final Notes

This project follows everything mentioned in the assignment:
- TypeScript everywhere  
- JWT auth  
- Zustand + React Query + RHF + Zod  
- MongoDB with a free Atlas cluster  
- Clean component structure  
- Fully working CRUD  
