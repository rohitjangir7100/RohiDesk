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
✅ Admin dashboard   
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
- **Icons**: Heroicons  
- **PWA**: Web Manifest + Service Worker  

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/rohitjangir7100/RohiDesk.git
cd RohiDesk

2. Install dependencies

npm install

3. Firebase Setup 🔥
Create a Firebase project at https://console.firebase.google.com

Enable Authentication (Email/Password)

Create Firestore database

Add your Firebase config in firebase.js:


// src/firebase.js
import { initializeApp } from "firebase/app";<br>
import { getFirestore } from "firebase/firestore";<br>
import { getAuth } from "firebase/auth";<br>

const firebaseConfig = {<br>
  apiKey: "XXXX",<br>
  authDomain: "XXXX",<br>
  projectId: "XXXX",<br>
  storageBucket: "XXXX",<br>
  messagingSenderId: "XXXX",<br>
  appId: "XXXX"<br>
};<br>

const app = initializeApp(firebaseConfig);<br>
export const db = getFirestore(app);<br>
export const auth = getAuth(app);<br>

4. Firestore Rules (Secure access)<br>

rules_version = '2';<br>
service cloud.firestore {<br>
  match /databases/{database}/documents {<br>
    match /tickets/{ticketId} {<br>
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;<br>
    }<br>
    match /feedbacks/{feedbackId} {<br>
      allow create: if request.auth != null;<br>
    }<br>
  }<br>
}<br>

5. EmailJS Setup 💌<br>
Sign up at EmailJS<br>
Create a service & email template (include message, user_email, user_name)<br>
Add credentials in .env file:<br>
VITE_EMAILJS_SERVICE_ID=your_service_id<br>
VITE_EMAILJS_TEMPLATE_ID=your_template_id<br>
VITE_EMAILJS_PUBLIC_KEY=your_public_key<br>

6. Razorpay Setup 💳<br>
Create account at Razorpay<br>
Use test key in .env:<br>
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx<br>

7. Start the app 🚀<br>
npm start<br>
Visit: http://localhost:3000<br>

📁 Project Structure<br>
src/<br>
│<br>
├── assets/               # Images, Lottie JSON<br>
├── components/           # Reusable components like TicketCard, Modal<br>
├── pages/                # Pages like Home, Dashboard, Privacy, etc.<br>
├── firebase.js           # Firebase config<br>
├── App.jsx / main.jsx    # Entry point<br>
├── styles/               # Tailwind or custom styles<br>
└── utils/                # Helper functions<br>

📦 Deployment<br>
You can deploy this app on Netlify, Vercel, or Firebase Hosting:<br>
npm run build<br>
Then upload the dist/ folder or connect your GitHub repo.<br>

🧠 Future Enhancements
Admin panel with role-based access
Chat support or ticket replies
Export ticket history
SMS/Push notifications
Ticket priority tagging

📄 License
MIT © Rohit

Made with 💙 using React, Firebase & Razorpay
