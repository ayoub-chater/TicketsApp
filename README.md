# 🎫 Ticket Management Web App (PERN Stack)

A simple and structured MVP ticket management application inspired by tools like **Jira** and **Trello**.
Built with **PostgreSQL**, **Express**, **React**, and **Node.js**, this project is part of a technical evaluation for a Full Stack Developer position.

## 🌐 Live Preview

> *To be deployed – you can clone and run locally using the steps below.*

---

## 📌 Features

* ✅ User registration and login with secure JWT authentication
* 🎟️ Create, update, and delete tickets
* 🗂️ Ticket attributes:

  * Title
  * Description
  * Status: `Open`, `Pending`, `Closed`
  * Priority: `Low`, `Medium`, `High`

* 🔎 Filter tickets by **status** and **priority**
* 🔒 Tickets are scoped to the logged-in user only
* 🧩 Fully RESTful API
* ⚡️ React frontend using Hooks and functional components
* 📦 Dockerized development environment

---

## 🛠️ Tech Stack

### 🔗 Frontend

* **React 19** – UI framework using Hooks only (no Redux)
* **React Router 7** – Routing and page navigation
* **Axios** – API communication
* **Lucide-react** – Icon library for clean UI
* **React-hot-toast** – Toast notifications

### 🔧 Backend

* **Node.js** – JavaScript runtime
* **Express.js** – REST API framework
* **PostgreSQL** – Relational database
* **pg** – PostgreSQL client for Node
* **JWT (jsonwebtoken)** – User authentication via tokens
* **bcrypt** – Password hashing
* **dotenv** – Environment variable configuration
* **CORS** – Enable cross-origin access

### 🧪 Dev Tools

* **Nodemon** – Auto-restart server on changes
* **Docker** – Dockerized backend, frontend, and database for easy deployment

---

## 🐳 Getting Started with Docker

To run the app with Docker:

1. Clone the repo
   
2. Create .env and .env.docker files (see examples)
   - You can find example templates named .env.example and .env.docker.example in the project root to guide you on required variables and their format.
  
3. Run "docker-compose up --build" 

This will:

  * Set up the PostgreSQL database
  * Build and run both backend and frontend services

4. Access frontend at http://localhost:5173 (or your configured port)  
5. Backend API runs on port 5001

---

## 🔒 Authentication Flow

* Passwords are hashed using **bcrypt**
* JWT token is returned on login and stored on the client side
* All protected routes are validated via JWT middleware

---

## 🙋‍♂️ Author

🌍 Developed by [Ayoub Chater](https://www.ayoubchater.com) 
📧 hello@ayoubchater.com 
