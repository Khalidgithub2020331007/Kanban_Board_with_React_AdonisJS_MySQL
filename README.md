# Kanban Board (React + AdonisJS + MySQL)

A full-stack Kanban Board application built using **React (frontend)**, **AdonisJS (backend)**, and **MySQL** as the database.  
Includes **user authentication**, **JWT-based login**, and **task management across multiple workflow stages**.

## 🚀 Features

### 🔐 Authentication
- User Registration  
- User Login (JWT)  
- Secure Password Hashing  
- Logout

### 📝 Task Management
- Create, Read, Update, Delete tasks  
- Multiple stages:
  - `todo`
  - `inprogress`
  - `testing`
  - `complete`
- Each user sees **only their own tasks**
- Drag-and-drop support (frontend)

### 🗄️ Backend (AdonisJS 6)
- REST API built using AdonisJS  
- Validation using VineJS  
- MySQL database integration  
- Lucid ORM Models: `User`, `Task`

### 🖥️ Frontend (React)
- Reusable Components  
- Axios API integration  
- Fully replaces old localStorage system  
- Simple and clean UI

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Axios |
| Backend | AdonisJS 6 |
| Database | MySQL |
| ORM | Lucid |
| Auth | JWT Token |
| Validation | VineJS |

---

## 📂 Folder Structure

