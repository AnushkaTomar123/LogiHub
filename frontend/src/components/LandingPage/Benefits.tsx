"use client";
import {
  FaTruck,
  FaUsers,
  FaCheckCircle,

} from 'react-icons/fa';
const Benefits=()=>{
    return(
        <>
          <section id="benefits" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Everyone in
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                The Logistics Ecosystem
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re a transporter or customer, our platform transforms your logistics experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Transporters */}
            <div className="group">
              <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaTruck className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">For Transporters</h3>
                  <p className="text-gray-600 text-lg">Transform your business with AI-powered insights</p>
                </div>
                
                <div className="space-y-5">
                  {[
                    'AI-powered route optimization saves 40% fuel costs',
                    'Automated billing and instant payment processing',
                    'Predictive demand forecasting for strategic planning',
                    'Smart vehicle positioning based on market demand',
                    'Real-time performance analytics and insights',
                    'Verified customer ratings and review system'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-1 rounded-full">
                        <FaCheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">₹50,000+</div>
                    <div className="text-gray-600 font-medium">Average Monthly Savings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* For Customers */}
            <div className="group">
              <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaUsers className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">For Customers</h3>
                  <p className="text-gray-600 text-lg">Experience seamless, transparent logistics</p>
                </div>
                
                <div className="space-y-5">
                  {[
                    'Find verified transporters in under 60 seconds',
                    'AI-powered instant quotes with transparent pricing',
                    'Real-time GPS tracking with live updates',
                    'Secure payment gateway with multiple options',
                    'Comprehensive insurance coverage included',
                    '24/7 customer support with instant resolution'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-1 rounded-full">
                        <FaCheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">30%</div>
                    <div className="text-gray-600 font-medium">Cost Reduction Guaranteed</div>
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
export default Benefits;