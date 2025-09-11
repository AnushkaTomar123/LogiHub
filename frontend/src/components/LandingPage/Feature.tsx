"use client";
import {
  FaBrain,
  FaShieldAlt,
  FaBolt,
  FaBullseye,
} from 'react-icons/fa';

function Feature() {
   const features = [
    {
      icon: <FaBrain className="h-8 w-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Revolutionary machine learning algorithms that predict demand, optimize routes, and maximize profits automatically.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaBolt className="h-8 w-8" />,
      title: 'Instant Smart Matching',
      description: 'Connect with perfect transport partners in seconds using our advanced matching algorithm.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <FaBullseye className="h-8 w-8" />,
      title: 'Dynamic Pricing Engine',
      description: 'Real-time pricing that adapts to market conditions, ensuring maximum profitability for transporters.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: 'Complete Transparency',
      description: 'End-to-end visibility with real-time tracking, verified ratings, and secure payment systems.',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
   <>
   <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Logistics Assistant
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI technology that thinks, learns, and optimizes your logistics operations 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-gray-900">AI Control Center</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <span className="font-medium text-gray-700">Route Optimization</span>
                      <span className="font-bold text-blue-600">32% Fuel Saved</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                      <span className="font-medium text-gray-700">Demand Prediction</span>
                      <span className="font-bold text-emerald-600">↑ 45% Next Week</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <span className="font-medium text-gray-700">Smart Pricing</span>
                      <span className="font-bold text-orange-600">₹3,250/trip</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <span className="font-medium text-gray-700">Load Factor</span>
                      <span className="font-bold text-purple-600">94% Efficiency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   </>
  )
}

export default Feature
