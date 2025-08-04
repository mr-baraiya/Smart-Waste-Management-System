import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  Recycle, 
  Leaf, 
  ShoppingBag, 
  MapPin, 
  BookOpen, 
  Users,
  Heart,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react"

const Footer = () => {
  // Scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "SWMS",
      icon: <Leaf className="w-5 h-5" />,
      links: [
        { to: "/features", label: "Features", icon: <Recycle className="w-4 h-4" /> },
        { to: "/learn", label: "Learning Hub", icon: <BookOpen className="w-4 h-4" /> },
        { to: "/shop", label: "Eco Store", icon: <ShoppingBag className="w-4 h-4" /> }
      ]
    },
    {
      title: "Services",
      icon: <MapPin className="w-5 h-5" />,
      links: [
        { to: "/sell-trash", label: "Sell Recyclables", icon: <Recycle className="w-4 h-4" /> },
        { to: "/nearby", label: "Find Centers", icon: <MapPin className="w-4 h-4" /> },
        { to: "/quiz", label: "Eco Quiz", icon: <BookOpen className="w-4 h-4" /> }
      ]
    },
    {
      title: "Company",
      icon: <Users className="w-5 h-5" />,
      links: [
        { to: "/about-us", label: "About Us", icon: <Users className="w-4 h-4" /> },
        { to: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
        { to: "/privacy", label: "Privacy Policy", icon: <BookOpen className="w-4 h-4" /> }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border-t border-lime-400/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,252,0,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                  SWMS
                </h3>
              </div>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Smart Waste Management System for a sustainable future. Join our mission to create a cleaner, greener world through intelligent waste management and environmental education.
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Built with passion for Mother Earth</span>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 rounded-lg bg-white/5">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm break-all">support@swms.eco</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 rounded-lg bg-white/5">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">+1 (555) ECO-HELP</span>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 2) }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-1.5 rounded-lg bg-lime-400/10">
                  {section.icon}
                </div>
                <h4 className="text-white font-semibold text-base sm:text-lg">{section.title}</h4>
              </div>
              
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className="group flex items-center gap-3 text-gray-400 hover:text-lime-400 transition-all duration-300"
                  >
                    <div className="p-1 rounded group-hover:bg-lime-400/10 transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2025 SWMS. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-4 text-xs text-gray-500">
              <Link to="/terms" className="hover:text-lime-400 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-lime-400 transition-colors">Privacy</Link>
              <Link to="/cookies" className="hover:text-lime-400 transition-colors">Cookies</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-400">Follow us:</span>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-lime-400/10 text-gray-400 hover:text-lime-400 transition-all touch-manipulation"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />
    </footer>
  );
};

export default Footer;
