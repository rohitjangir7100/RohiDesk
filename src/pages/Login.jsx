import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import GoogleLoginButton from "../components/GoogleLoginButton";


export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      toast.success("Logged in ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <section className="w-full max-w-md backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-lg p-6 space-y-6">
        {/* header */}
        <div className="text-center space-y-1">
          <ArrowRightOnRectangleIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Login to continue
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(); // Trigger login on Enter
          }}
          className="space-y-4">
          <label className="relative block">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border rounded px-3 pt-5 pb-2 bg-transparent text-sm placeholder-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <span className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
              Email
            </span>
          </label>

          <label className="relative block">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              className="peer w-full border rounded px-3 pt-5 pb-2 pr-10 bg-transparent text-sm placeholder-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <span className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
              Password
            </span>

            {/* toggle */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              {show ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </label>

          <button
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
            or
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>

        <GoogleLoginButton />

        <p className="text-center text-sm">
          No account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
