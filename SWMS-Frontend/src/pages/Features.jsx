"use client"

import { motion } from "framer-motion"
import { Camera, MessageCircle, GraduationCap, ShoppingBag, Truck, MapPin, Zap, Shield, Users } from "lucide-react"
import PageTransition from "../components/PageTransition"
import { Link } from "react-router-dom" // Correct import

const Features = () => {
  const mainFeatures = [
    {
      icon: Camera,
      title: "AI Waste Classifier",
      desc: "Advanced computer vision technology that instantly identifies waste types from photos and provides detailed recycling instructions.",
      details: ["Real-time image recognition", "Detailed recycling guides", "Material composition analysis"],
      link: "/waste-classifier",
    },
    {
      icon: MessageCircle,
      title: "Smart Eco-Chatbot",
      desc: "Your personal sustainability assistant powered by AI, ready to answer questions about recycling and eco-friendly living.",
      details: ["24/7 availability", "Personalized recommendations", "Multi-language support"],
      link: "/chatbot",
    },
    {
      icon: GraduationCap,
      title: "Gamified Learning Hub",
      desc: "Interactive educational modules with video content, quizzes, and achievement systems to make learning fun.",
      details: ["Video tutorials", "Progress tracking", "Achievement badges"],
      link: "/learn",
    },
  ]

  const additionalFeatures = [
    { icon: ShoppingBag, title: "Eco-Commerce", desc: "Curated marketplace for sustainable products" },
    { icon: Truck, title: "Waste Collection", desc: "Connect with local recycling services" },
    { icon: MapPin, title: "Location Services", desc: "Find nearby recycling centers" },
    { icon: Zap, title: "Real-time Analytics", desc: "Track your environmental impact" },
    { icon: Shield, title: "Data Security", desc: "Your privacy is our priority" },
    { icon: Users, title: "Community", desc: "Connect with eco-conscious users" },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 space-y-20">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-2xl mb-6"
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 text-transparent bg-clip-text mb-6">
                Powerful Features
              </h1>
              <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Discover all the innovative tools and capabilities that make SWMS the ultimate 
                waste management solution for a sustainable future.
              </p>
            </div>
          </motion.div>

          {/* Main Features */}
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className={`flex flex-col lg:flex-row items-center gap-16 group ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-8"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                      <feature.icon className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-slate-300 text-xl leading-relaxed">{feature.desc}</p>
                  <div className="space-y-4">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
                      >
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 shadow-lg shadow-emerald-500/50"></div>
                        <span className="text-lg">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-lg"
                  >
                    Explore Feature
                    <Zap className="w-5 h-5" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className="aspect-video rounded-3xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm flex items-center justify-center group-hover:border-emerald-400/50 group-hover:shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden relative">
                    {/* Animated background */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-blue-400/5"
                    />
                    <feature.icon className="w-32 h-32 text-emerald-400/60 group-hover:text-emerald-400/80 group-hover:scale-110 transition-all duration-500 relative z-10" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Enhanced Additional Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 text-transparent bg-clip-text mb-4">
                Additional Features
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Explore more powerful tools designed to enhance your sustainability journey
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 hover:border-emerald-400/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-emerald-500/30">
                      <feature.icon className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making a difference with our comprehensive 
              waste management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <Zap className="w-5 h-5" />
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <GraduationCap className="w-5 h-5" />
                Start Learning
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Features
