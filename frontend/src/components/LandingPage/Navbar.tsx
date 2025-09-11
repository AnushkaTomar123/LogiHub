"use client";
import {
    FaBars,
    FaTimes,
  FaTruck,
  
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Navbar=()=>{
     const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    return(
        <>
         <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                  <FaTruck className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Logi-Hub
                </span>
                <div className="text-xs text-gray-500 font-medium">AI-Powered Logistics</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Benefits</a>
              <a href="#success" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Success Stories</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold">
               Login
              </button>
               <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold">
               Sign up
              </button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#benefits" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Benefits</a>
              <a href="#success" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Success Stories</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold">
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </nav>

        </>
    )
}
export default Navbar;