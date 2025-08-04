"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import api from "../utils/api"; // Import the configured axios instance
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login } = useAuth(); // Use the login function from AuthContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError(""); // Clear API error on input change
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await api.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      login(token, user);
      console.log("Login successful:", user);

      // const redirectPath = user.role === "admin" ? "/admin-dashboard" : "/dashboard"

      Swal.fire({
        title: "🎉 Login Successful!",
        text: "Welcome back! Redirecting...",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "Go Now",
        background: "#1f2937",
        color: "#f8fafc",
        iconColor: "#22c55e",
        confirmButtonColor: "#22c55e",
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-2xl font-bold",
          confirmButton:
            "px-6 py-2 rounded bg-lime-500 text-neutral-900 font-semibold hover:bg-lime-400 transition",
          timerProgressBar: "bg-lime-400",
        },
        didOpen: () => {
          Swal.getPopup().classList.add(
            "animate_animated",
            "animate_fadeInDown"
          );
        },
      }).then(() => {
        if (response.data.user?.role === "admin") {
          console.log("Admin user detected, redirecting to admin dashboard");
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      })
    } catch (err) {
      console.error("Login error:", err);
      setApiError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );

      Swal.fire({
        title: "❌ Login Failed!",
        text: err.response?.data?.message || "Invalid email or password.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Try Again",
        background: "#1f2937",
        color: "#f8fafc",
        iconColor: "#f87171",
        confirmButtonColor: "#f87171",
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-2xl font-semibold",
          confirmButton:
            "px-6 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-400 transition",
        },
        didOpen: () => {
          Swal.getPopup().classList.add("animate__animated", "animate__shakeX");
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-xl"
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 text-transparent bg-clip-text">
                Welcome Back
              </h1>
              <p className="text-slate-300 text-lg mt-2">Sign in to your SWMS account</p>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center"
                >
                  <p className="text-red-400 text-sm">{apiError}</p>
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 w-5 h-5 transition-colors duration-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
                        : "border-white/10 focus:border-emerald-400/50 focus:shadow-lg focus:shadow-emerald-500/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 w-5 h-5 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${
                      errors.password
                        ? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
                        : "border-white/10 focus:border-emerald-400/50 focus:shadow-lg focus:shadow-emerald-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition-colors duration-300 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-400 focus:ring-2 focus:ring-offset-0 transition-all duration-300"
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-300">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-semibold shadow-xl hover:shadow-emerald-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <p className="text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-semibold inline-flex items-center gap-1"
              >
                Sign up here
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
