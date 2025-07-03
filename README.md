# RohiDesk - Service Desk Application 🛠️💬

A fully responsive and modern Service Desk application built with **React**, **Firebase**, and **Tailwind CSS**, featuring ticket creation, real-time updates, user feedback via EmailJS, and secure payments via Razorpay.

---

## 🌟 Features

✅ User Authentication (Firebase Auth)  
✅ Create, view, and manage tickets  
✅ Real-time ticket updates using Firestore  
✅ PDF ticket generation  
✅ Email notifications (EmailJS)  
✅ Feedback submission with Email & Firestore storage  
✅ Razorpay payment integration  
✅ Modern UI with light/dark mode support  
✅ PWA support with offline error message  
✅ Admin dashboard with charts  
✅ Animated empty state (Lottie)  
✅ Keyboard accessibility  
✅ Toast notifications  
✅ In-app notification bell with unread badge  
✅ About, Privacy, and Terms pages  
✅ Responsive on all screen sizes  

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Heroicons  
- **Backend**: Firebase (Auth + Firestore)  
- **Email**: [EmailJS](https://www.emailjs.com/)  
- **Payments**: [Razorpay](https://razorpay.com/docs/)  
- **PDF**: jsPDF, html2canvas  
- **Notifications**: react-toastify  
- **Animations**: Lottie-react  
- **Icons**: Heroicons  
- **PWA**: Web Manifest + Service Worker  

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/rohitjangir7100/RohiDesk.git
cd service-desk-app

2. Install dependencies

npm install

3. Firebase Setup 🔥
Create a Firebase project at https://console.firebase.google.com

Enable Authentication (Email/Password)

Create Firestore database

Add your Firebase config in firebase.js:


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

4. Firestore Rules (Secure access)

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tickets/{ticketId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /feedbacks/{feedbackId} {
      allow create: if request.auth != null;
    }
  }
}

5. EmailJS Setup 💌
Sign up at EmailJS

Create a service & email template (include message, user_email, user_name)

Add credentials in .env file:
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

6. Razorpay Setup 💳
Create account at Razorpay

Use test key in .env:
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx

7. Start the app 🚀
npm start
Visit: http://localhost:3000

📁 Project Structure
src/
│
├── assets/               # Images, Lottie JSON
├── components/           # Reusable components like TicketCard, Modal
├── pages/                # Pages like Home, Dashboard, Privacy, etc.
├── firebase.js           # Firebase config
├── App.jsx / main.jsx    # Entry point
├── styles/               # Tailwind or custom styles
└── utils/                # Helper functions

📦 Deployment
You can deploy this app on Netlify, Vercel, or Firebase Hosting:
npm run build
Then upload the dist/ folder or connect your GitHub repo.

🧠 Future Enhancements
Admin panel with role-based access

Chat support or ticket replies

Export ticket history

SMS/Push notifications

Ticket priority tagging

📄 License
MIT © Rohit

Made with 💙 using React, Firebase & Razorpay
