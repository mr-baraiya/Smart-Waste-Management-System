"use client"

import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
		subscribeNewsletter: false,
	})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = () => {
		const newErrors = {}

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required"
		} else if (formData.firstName.trim().length < 2) {
			newErrors.firstName = "First name must be at least 2 characters"
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required"
		} else if (formData.lastName.trim().length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters"
		}

		// Email validation
		if (!formData.email) {
			newErrors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		// Phone validation
		if (!formData.phone) {
			newErrors.phone = "Phone number is required"
		} else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone)) {
			newErrors.phone = "Please enter a valid phone number"
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required"
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters"
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
			newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password"
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match"
		}

		// Terms agreement validation
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = "You must agree to the terms and conditions"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) return

		setIsLoading(true)

		try {
			const response = await fetch("http://localhost:9705/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Registration failed")
			}

			console.log("Registration successful:", data.user)

			// SweetAlert Success Alert
			Swal.fire({
				title: "🎉 Registration Successful!",
				text: "You're all set! Redirecting to login...",
				icon: "success",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: true,
				confirmButtonColor: "#22c55e", // Tailwind lime-500
				background: "#1f2937", // Tailwind slate-800
				color: "#f1f5f9", // Tailwind slate-100
				iconColor: "#22c55e",
				customClass: {
					popup: "rounded-xl shadow-lg",
					title: "text-2xl font-semibold",
					confirmButton: "px-6 py-2 rounded bg-lime-500 text-neutral-900 font-semibold hover:bg-lime-400",
					timerProgressBar: "bg-lime-400",
				},
				didOpen: () => {
					const popup = Swal.getPopup()
					popup.classList.add("animate__animated", "animate__fadeInDown")
				},
			}).then(() => {
				navigate("/login")
			})
		} catch (err) {
			console.error("Error:", err.message)
			Swal.fire({
				title: "Error!",
				text: err.message,
				icon: "error",
				confirmButtonText: "Try Again"
			})
		} finally {
			setIsLoading(false)
		}
	}


	const getPasswordStrength = () => {
		const password = formData.password
		if (!password) return { strength: 0, label: "", color: "" }

		let strength = 0
		if (password.length >= 8) strength++
		if (/[a-z]/.test(password)) strength++
		if (/[A-Z]/.test(password)) strength++
		if (/\d/.test(password)) strength++
		if (/[^a-zA-Z\d]/.test(password)) strength++

		const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
		const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

		return {
			strength: (strength / 5) * 100,
			label: labels[strength - 1] || "",
			color: colors[strength - 1] || "bg-gray-500",
		}
	}

	const passwordStrength = getPasswordStrength()

	return (
		<PageTransition>
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="w-full max-w-4xl space-y-8 relative z-10"
				>
					{/* Header */}
					<div className="text-center space-y-6">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-xl"
						>
							<User className="w-10 h-10 text-white" />
						</motion.div>
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
								Create Your Account
							</h1>
							<p className="text-slate-300 text-lg mt-2">Join SWMS and start your sustainable journey</p>
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
							{/* Name Fields */}
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-slate-200 mb-3">First Name</label>
									<div className="relative group">
										<User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
										<input
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
											placeholder="Enter your first name"
											className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.firstName
												? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
												: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
												}`}
										/>
									</div>
									{errors.firstName && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-red-400 text-sm mt-2 flex items-center gap-2"
										>
											<span className="w-1 h-1 bg-red-400 rounded-full"></span>
											{errors.firstName}
										</motion.p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-slate-200 mb-3">Last Name</label>
									<div className="relative group">
										<User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
										<input
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
											placeholder="Enter your last name"
											className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.lastName
												? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
												: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
												}`}
										/>
									</div>
									{errors.lastName && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-red-400 text-sm mt-2 flex items-center gap-2"
										>
											<span className="w-1 h-1 bg-red-400 rounded-full"></span>
											{errors.lastName}
										</motion.p>
									)}
								</div>
							</div>

							{/* Email Field */}
							<div>
								<label className="block text-sm font-semibold text-slate-200 mb-3">Email Address</label>
								<div className="relative group">
									<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Enter your email"
										className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.email 
											? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20" 
											: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
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

							{/* Phone Field */}
							<div>
								<label className="block text-sm font-semibold text-slate-200 mb-3">Phone Number</label>
								<div className="relative group">
									<Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="Enter your phone number"
										className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.phone 
											? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20" 
											: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
											}`}
									/>
								</div>
								{errors.phone && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-2 flex items-center gap-2"
									>
										<span className="w-1 h-1 bg-red-400 rounded-full"></span>
										{errors.phone}
									</motion.p>
								)}
							</div>

							{/* Password Field */}
							<div>
								<label className="block text-sm font-semibold text-slate-200 mb-3">Password</label>
								<div className="relative group">
									<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Create a strong password"
										className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.password 
											? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20" 
											: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
											}`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-300 p-1"
									>
										{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
									</button>
								</div>

								{/* Enhanced Password Strength Indicator */}
								{formData.password && (
									<div className="mt-4 space-y-3">
										<div className="flex items-center gap-3">
											<div className="flex-1 h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
												<div
													className={`h-full transition-all duration-500 ease-out ${passwordStrength.color} shadow-sm`}
													style={{ width: `${passwordStrength.strength}%` }}
												></div>
											</div>
											<span className={`text-sm font-medium px-2 py-1 rounded-lg ${
												passwordStrength.strength > 80 ? 'text-green-300 bg-green-500/10' :
												passwordStrength.strength > 60 ? 'text-blue-300 bg-blue-500/10' :
												passwordStrength.strength > 40 ? 'text-yellow-300 bg-yellow-500/10' :
												'text-red-300 bg-red-500/10'
											}`}>
												{passwordStrength.label}
											</span>
										</div>
									</div>
								)}

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

							{/* Confirm Password Field */}
							<div>
								<label className="block text-sm font-semibold text-slate-200 mb-3">Confirm Password</label>
								<div className="relative group">
									<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 w-5 h-5 transition-colors duration-300" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										placeholder="Confirm your password"
										className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${errors.confirmPassword
											? "border-red-500/50 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
											: "border-white/10 focus:border-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
											}`}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-300 p-1"
									>
										{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
									</button>
								</div>
								{errors.confirmPassword && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-2 flex items-center gap-2"
									>
										<span className="w-1 h-1 bg-red-400 rounded-full"></span>
										{errors.confirmPassword}
									</motion.p>
								)}
							</div>

							{/* Enhanced Checkboxes */}
							<div className="space-y-6">
								<label className="flex items-start gap-4 cursor-pointer group">
									<div className="relative flex-shrink-0 mt-1">
										<input
											type="checkbox"
											name="agreeToTerms"
											checked={formData.agreeToTerms}
											onChange={handleInputChange}
											className="sr-only"
										/>
										<div
											className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
												formData.agreeToTerms 
													? "bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500 shadow-lg shadow-purple-500/25" 
													: "border-slate-400 bg-white/5 group-hover:border-purple-400"
												}`}
										>
											{formData.agreeToTerms && (
												<Check className="w-4 h-4 text-white" />
											)}
										</div>
									</div>
									<span className="text-slate-300 group-hover:text-white transition-colors duration-300">
										I agree to the{" "}
										<Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
											Privacy Policy
										</Link>
									</span>
								</label>
								{errors.agreeToTerms && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm flex items-center gap-2 ml-10"
									>
										<span className="w-1 h-1 bg-red-400 rounded-full"></span>
										{errors.agreeToTerms}
									</motion.p>
								)}

								<label className="flex items-start gap-4 cursor-pointer group">
									<div className="relative flex-shrink-0 mt-1">
										<input
											type="checkbox"
											name="subscribeNewsletter"
											checked={formData.subscribeNewsletter}
											onChange={handleInputChange}
											className="sr-only"
										/>
										<div
											className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
												formData.subscribeNewsletter 
													? "bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500 shadow-lg shadow-purple-500/25" 
													: "border-slate-400 bg-white/5 group-hover:border-purple-400"
												}`}
										>
											{formData.subscribeNewsletter && (
												<Check className="w-4 h-4 text-white" />
											)}
										</div>
									</div>
									<span className="text-slate-300 group-hover:text-white transition-colors duration-300">
										Subscribe to our newsletter for eco-tips and updates
									</span>
								</label>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-semibold shadow-xl hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
							>
								{isLoading ? (
									<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
								) : (
									<>
										Create Account
										<ArrowRight className="w-5 h-5" />
									</>
								)}
							</button>
						</form>
					</motion.div>

					{/* Sign In Link */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
					>
						<p className="text-slate-300">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold inline-flex items-center gap-1"
							>
								Sign in here
								<ArrowRight className="w-4 h-4" />
							</Link>
						</p>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	)
}

export default SignUp
