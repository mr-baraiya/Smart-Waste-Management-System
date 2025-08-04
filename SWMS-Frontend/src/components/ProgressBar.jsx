import { useState, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

const ProgressBar = ({ 
  height = "h-1", 
  color = "bg-gradient-to-r from-lime-400 to-emerald-500",
  className = "",
  showPercentage = false,
  position = "top" // top, bottom
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const smoothProgress = useSpring(scrollProgress, { stiffness: 400, damping: 40 })
  
  // Transform scroll progress to scale
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1])
  const opacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 1, 1])

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0
      setScrollProgress(scrolled)
    }

    // Update on scroll
    window.addEventListener("scroll", updateScrollProgress)
    // Update on resize (in case content height changes)
    window.addEventListener("resize", updateScrollProgress)
    // Initial calculation
    updateScrollProgress()
    
    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
    }
  }, [])

  const positionClasses = {
    top: "top-0",
    bottom: "bottom-0"
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className={`fixed ${positionClasses[position]} left-0 ${height} ${color} origin-left z-50 ${className}`}
        style={{ 
          scaleX,
          opacity,
          width: "100%"
        }}
      />
      
      {/* Glow Effect */}
      <motion.div
        className={`fixed ${positionClasses[position]} left-0 h-0.5 bg-lime-400/50 origin-left z-40 blur-sm`}
        style={{ 
          scaleX,
          opacity: useTransform(smoothProgress, [0, 0.05, 1], [0, 0.6, 0.6]),
          width: "100%"
        }}
      />

      {/* Percentage Display */}
      {showPercentage && (
        <motion.div
          style={{ opacity }}
          className="fixed top-4 right-4 z-50 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white font-medium"
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>
      )}
    </>
  )
}

// Reading Progress Bar variant for articles/blog posts
export const ReadingProgressBar = ({ 
  targetElement = null, 
  color = "bg-gradient-to-r from-lime-400 to-emerald-500" 
}) => {
  const [progress, setProgress] = useState(0)
  const smoothProgress = useSpring(progress, { stiffness: 400, damping: 40 })
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1])

  useEffect(() => {
    const updateProgress = () => {
      const element = targetElement || document.documentElement
      const scrollTop = element.scrollTop || window.pageYOffset
      const scrollHeight = element.scrollHeight || document.documentElement.scrollHeight
      const clientHeight = element.clientHeight || window.innerHeight
      
      const totalScrollable = scrollHeight - clientHeight
      const scrolled = totalScrollable > 0 ? scrollTop / totalScrollable : 0
      
      setProgress(Math.min(Math.max(scrolled, 0), 1))
    }

    const target = targetElement || window
    target.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)
    updateProgress()

    return () => {
      target.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [targetElement])

  return (
    <motion.div
      className={`fixed top-0 left-0 h-1 ${color} origin-left z-50`}
      style={{ 
        scaleX,
        width: "100%"
      }}
    />
  )
}

// Circular Progress variant
export const CircularProgress = ({ 
  size = 60, 
  strokeWidth = 4, 
  color = "#7cf000",
  backgroundColor = "rgba(255,255,255,0.1)",
  showPercentage = false,
  className = ""
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (scrollProgress * circumference)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    window.addEventListener("resize", updateScrollProgress)
    updateScrollProgress()
    
    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
    }
  }, [])

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.1s ease-out"
            }}
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
