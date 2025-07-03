// src/ServiceDeskApp.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import { AnimatePresence } from "framer-motion";


/* pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketForm from "./pages/TicketForm";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import UserTickets from "./pages/UserTickets";
import Policies from "./pages/Policies";

/* inner container so useLocation is inside Router */
function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <Register />
                </PageWrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              }
            />
            <Route
              path="/raise-ticket"
              element={
                <PageWrapper>
                  <TicketForm />
                </PageWrapper>
              }
            />
            <Route
              path="/admin"
              element={
                <PageWrapper>
                  <AdminPanel />
                </PageWrapper>
              }
            />

            {/* 📄 static pages */}
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageWrapper>
                  <Privacy />
                </PageWrapper>
              }
            />
            <Route
              path="/my-tickets"
              element={
                <PageWrapper>
                  <UserTickets />
                </PageWrapper>
              }
            />
            <Route
              path="/policies"
              element={
                <PageWrapper>
                  <Policies />
                </PageWrapper>
              }
            />

            <Route
              path="/terms"
              element={
                <PageWrapper>
                  <Terms />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function ServiceDeskApp() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
