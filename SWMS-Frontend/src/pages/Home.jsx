import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  MessageCircle,
  GraduationCap,
  ClipboardList,
  ShoppingBag,
  Truck,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Waste Classifier",
      desc: "Upload a photo, get instant AI classification plus recycling tips.",
      link: "/waste-classifier",
    },
    {
      icon: MessageCircle,
      title: "Eco-Chatbot",
      desc: "Ask anything about recycling, sustainable living and the app.",
      link: "/chatbot",
    },
    {
      icon: GraduationCap,
      title: "Gamified Learning",
      desc: "Watch bite-sized videos, earn badges and level up your eco-IQ.",
      link: "/learn",
    },
    {
      icon: ClipboardList,
      title: "Quizzes & Badges",
      desc: "Challenge yourself with MCQs after each module.",
      link: "/quiz",
    },
    {
      icon: ShoppingBag,
      title: "Eco-Commerce",
      desc: "Discover hand-picked sustainable products.",
      link: "/shop",
    },
    {
      icon: Truck,
      title: "Sell Recyclables",
      desc: "Form-based flow to monetize your sorted trash with local collectors.",
      link: "/sell-trash",
    },
    {
      icon: MapPin,
      title: "Nearby Centers",
      desc: "Interactive map showing closest recycling points.",
      link: "/nearby",
    },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center">
        {/* Background Image with Enhanced Parallax */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1600&q=80"
            className="w-full h-full object-cover opacity-25"
            alt="Waste management background"
          />
        </motion.div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-slate-900/40 to-blue-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-6 w-full flex flex-col items-center text-center gap-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Smart Waste
              <br className="hidden lg:block" />
              <span className="text-4xl lg:text-6xl"> Management System</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl text-xl text-slate-300 leading-relaxed"
            >
              Transform your environmental impact with AI-powered waste classification, 
              gamified learning experiences, eco-commerce solutions, and comprehensive 
              recycling guidance — all unified in one intelligent platform.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link
              to="/features"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Explore Features 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/waste-classifier"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              Try AI Classifier
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">98%</div>
              <div className="text-sm text-slate-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">10K+</div>
              <div className="text-sm text-slate-400">Items Classified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-sm text-slate-400">Learning Modules</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-400 text-transparent bg-clip-text">
            All-in-One Feature Suite
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to recycle smarter, learn faster, and live greener. 
            Discover our comprehensive ecosystem of environmental tools.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link to={feature.link} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-400/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-12 mt-20"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making their environmental impact count. 
            Start your journey towards sustainable living today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
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
      </section>
    </PageTransition>
  );
};

export default Home;
