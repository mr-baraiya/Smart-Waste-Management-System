import { useState, useEffect } from "react"
import { ArrowUp, ChevronUp } from "lucide-react"
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"

const ScrollToTop = ({ 
  threshold = 500,
  position = "bottom-right", // bottom-right, bottom-left, bottom-center
  size = "medium", // small, medium, large
  variant = "default", // default, minimal, progress
  smooth = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const smoothProgress = useSpring(scrollProgress, { stiffness: 400, damping: 40 })
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0
      
      setIsVisible(scrolled > threshold)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", toggleVisibility)
    window.addEventListener("resize", toggleVisibility)
    toggleVisibility() // Initial check
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      window.removeEventListener("resize", toggleVisibility)
    }
  }, [threshold])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2"
  }

  // Size classes
  const sizeClasses = {
    small: { 
      button: "p-2 w-10 h-10", 
      icon: "w-4 h-4",
      circle: 32
    },
    medium: { 
      button: "p-3 w-12 h-12", 
      icon: "w-5 h-5",
      circle: 40
    },
    large: { 
      button: "p-4 w-14 h-14", 
      icon: "w-6 h-6",
      circle: 48
    }
  }

  const sizeConfig = sizeClasses[size]

  // Button variants
  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.95
    }
  }

  if (variant === "progress") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className={`fixed ${positionClasses[position]} ${sizeConfig.button} rounded-full bg-neutral-900/80 backdrop-blur-sm border border-white/10 text-lime-400 shadow-lg hover:shadow-lime-400/25 transition-all z-50 group`}
            aria-label="Scroll to top"
          >
            <div className="relative flex items-center justify-center">
              {/* Progress Circle */}
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox={`0 0 ${sizeConfig.circle} ${sizeConfig.circle}`}
              >
                <circle
                  cx={sizeConfig.circle / 2}
                  cy={sizeConfig.circle / 2}
                  r={(sizeConfig.circle - 4) / 2}
                  stroke="rgba(124, 252, 0, 0.2)"
                  strokeWidth="2"
                  fill="transparent"
                />
                <motion.circle
                  cx={sizeConfig.circle / 2}
                  cy={sizeConfig.circle / 2}
                  r={(sizeConfig.circle - 4) / 2}
                  stroke="#7cf000"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray={`${((sizeConfig.circle - 4) / 2) * 2 * Math.PI}`}
                  style={{
                    pathLength,
                    strokeLinecap: "round"
                  }}
                />
              </svg>
              
              {/* Arrow Icon */}
              <ArrowUp className={`${sizeConfig.icon} relative z-10 group-hover:scale-110 transition-transform`} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    )
  }

  if (variant === "minimal") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className={`fixed ${positionClasses[position]} ${sizeConfig.button} rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-lime-400/20 hover:text-lime-400 transition-all z-50 group border border-white/20`}
            aria-label="Scroll to top"
          >
            <ChevronUp className={`${sizeConfig.icon} group-hover:scale-110 transition-transform`} />
          </motion.button>
        )}
      </AnimatePresence>
    )
  }

  // Default variant
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          className={`fixed ${positionClasses[position]} ${sizeConfig.button} rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 text-neutral-950 shadow-lg hover:shadow-lime-400/30 transition-all z-50 group`}
          aria-label="Scroll to top"
        >
          <ArrowUp className={`${sizeConfig.icon} group-hover:scale-110 transition-transform`} />
          
          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Alternative: Floating Action Button with text
export const FloatingScrollButton = ({ 
  threshold = 500,
  text = "Back to Top",
  position = "bottom-right"
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > threshold)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`fixed ${positionClasses[position]} flex items-center gap-2 px-4 py-3 bg-neutral-900/90 backdrop-blur-sm border border-white/10 text-white rounded-full shadow-lg hover:shadow-lime-400/25 hover:border-lime-400/50 transition-all z-50 group`}
        >
          <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{text}</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
