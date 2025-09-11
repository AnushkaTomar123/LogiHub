"use client";
import {
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaArrowRight,
  FaPlay,
  FaBolt,
  FaChevronDown,
} from 'react-icons/fa';

const HeroSection=()=>{
    const stats = [
    { value: '₹250B+', label: 'Market Opportunity', color: 'text-blue-600' },
    { value: '50M+', label: 'Potential Users', color: 'text-emerald-600' },
    { value: '40%', label: 'Cost Reduction', color: 'text-orange-600' },
    { value: '24/7', label: 'AI Intelligence', color: 'text-purple-600' }
  ];
    return(
        <>
         <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-700 text-sm font-semibold mb-8 animate-fade-in-up">
              <FaBolt className="h-4 w-4 mr-2" />
              India&apos;s First AI-Powered Logistics Revolution
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in-up animation-delay-200">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Logistics Forever
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              The world&apos;s most intelligent logistics platform that connects transporters and customers 
              with <span className="font-semibold text-blue-600">AI-powered precision</span>. 
              Experience the future of logistics today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-600">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold text-lg flex items-center justify-center">
                Start Your Journey
                <FaArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-bold text-lg flex items-center justify-center">
                <FaPlay className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-fade-in-up animation-delay-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaChevronDown className="h-8 w-8 text-gray-400" />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The ₹250 Billion Problem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              India&apos;s logistics industry is broken. Fragmented, inefficient, and stuck in the past. 
              <span className="font-semibold text-red-600"> It&apos;s time for a revolution.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaClock className="h-10 w-10" />,
                title: 'Massive Inefficiencies',
                description: 'Transporters lose 40% of potential revenue due to manual processes, empty returns, and poor route planning.',
                color: 'red',
                stat: '40% Revenue Lost'
              },
              {
                icon: <FaShieldAlt className="h-10 w-10" />,
                title: 'Zero Transparency',
                description: 'Customers have no visibility into pricing, tracking, or reliability. Trust is completely broken.',
                color: 'yellow',
                stat: '70% Distrust Rate'
              },
              {
                icon: <FaChartLine className="h-10 w-10" />,
                title: 'Poor Decision Making',
                description: 'No data, no insights, no optimization. Decisions are made blindly, leading to massive losses.',
                color: 'purple',
                stat: '₹50K Monthly Loss'
              }
            ].map((problem, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className={`bg-${problem.color}-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`text-${problem.color}-600`}>
                      {problem.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{problem.description}</p>
                  <div className={`inline-flex items-center px-4 py-2 bg-${problem.color}-50 rounded-full text-${problem.color}-700 font-bold text-sm`}>
                    {problem.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></>
    )
}
export default HeroSection