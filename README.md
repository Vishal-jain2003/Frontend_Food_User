# 🍽️ PetPooja-AI – AI-Powered Food Ordering System

An intelligent full-stack food ordering web application inspired by real-world restaurant platforms, featuring role-based access, AI-powered recipe and content generation, secure payments, and media handling.

🔗 **Live Demo:** [https://petpooja-ai.vercel.app](https://petpooja-ai.vercel.app)

---

## 🚀 Tech Stack

- **Frontend:** React, Bootstrap, Vercel
- **Backend:** Spring Boot, JWT Authentication, MongoDB, Render (Dockerized)
- **AI Integration:** Gemini API (Google)
- **Payments:** Razorpay
- **Media Storage:** Cloudinary
- **Other Tools:** Spring MailSender, PDF Generator, Text-to-Speech API

---

## 🎯 Key Features

### 🔐 Authentication & Authorization
- JWT-based login system
- Separate dashboards for **User** and **Admin**
- Protected routes and role-based UI

### 🧠 AI-Powered Functionality (Gemini API)
- **ChefAI (User):** 
  - AI-generated recipes based on ingredients or food names
  - Voice response using text-to-speech
  - PDF download of generated recipes
- **Smart Admin (Admin):**
  - Auto-generates food item descriptions using Gemini AI
  - Enhances product listing automation

### 📧 Email Automation
- Sends welcome emails on registration via Spring MailSender
- Configured using secure environment variables

### 💳 Payments & Orders
- Integrated Razorpay for secure online payments
- Order summary with real-time payment status
- Cart and checkout UI with auto-calculated totals

### 🖼️ Media Handling
- Food images uploaded via Cloudinary
- Stores both `secure_url` (frontend use) and `public_id` (backend deletion support)

### 🎨 UI/UX
- Clean, mobile-responsive interface using Bootstrap
- Easy navigation, dynamic food listing, cart, and order tracking

---

## 🧱 Architecture & Deployment

| Layer        | Tech/Platform                    |
|--------------|----------------------------------|
| Frontend     | React, Bootstrap, hosted on Vercel |
| Backend      | Spring Boot (Dockerized), hosted on Render |
| Database     | MongoDB                          |
| Image Store  | Cloudinary                       |
| AI API       | Gemini API (Google Generative AI) |
| Payment      | Razorpay                         |

---



## 🛠️ Run Locally

### Prerequisites
- Node.js, Maven, Docker
- MongoDB instance
- Razorpay & Gemini API keys
- Cloudinary credentials

### Frontend

```bash
cd frontend
npm install
npm run dev
