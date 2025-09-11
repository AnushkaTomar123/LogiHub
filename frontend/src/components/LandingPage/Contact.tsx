"use client";
import {
  FaPhone,
  FaEnvelope,
  FaAward,
  FaGlobe,
  FaChartBar,
} from 'react-icons/fa';
const Contact=()=>{
    return(
        <> <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let&apos;s Transform Your
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Logistics Together
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to revolutionize your logistics operations? Our team is here to help you get started.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl">
                  <FaPhone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Call Us Now</h4>
                  <p className="text-gray-600 text-lg">+91 (XXX) XXX-XXXX</p>
                  <p className="text-gray-500">Available 24/7 for support</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-xl">
                  <FaEnvelope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Email Us</h4>
                  <p className="text-gray-600 text-lg">hello@logi-hub.com</p>
                  <p className="text-gray-500">We respond within 2 hours</p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Logi-Hub?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FaAward className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">India&apos;s #1 AI-Powered Logistics Platform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaGlobe className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Serving 500+ Cities Across India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaChartBar className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">40% Average Cost Reduction Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get Started Today</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="Enter your full name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="+91 XXXXX XXXXX" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Business Type</label>
                  <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg">
                    <option>Select your business type</option>
                    <option>Transporter</option>
                    <option>Customer/Shipper</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Tell us about your needs</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="Describe your logistics requirements..."
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-5 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold text-lg">
                  Start My Transformation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

        </>
    )
}
export default Contact;