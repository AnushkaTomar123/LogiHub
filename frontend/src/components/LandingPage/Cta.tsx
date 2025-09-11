"use client"

import { FaArrowRight } from "react-icons/fa";

const Cta=()=>{
    return(
        <>
        <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Join the
            <span className="block">Logistics Revolution?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Don&apos;t let your competitors get ahead. Transform your logistics operations today with 
            India&apos;s most advanced AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-white text-blue-600 px-12 py-5 rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold text-xl">
              Start Free Trial
              <FaArrowRight className="inline ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white text-white px-12 py-5 rounded-2xl hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300 font-bold text-xl">
              Schedule Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Free Setup</div>
              <div className="text-blue-100">No hidden charges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7 Support</div>
              <div className="text-blue-100">Always here to help</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">30-Day Trial</div>
              <div className="text-blue-100">Risk-free guarantee</div>
            </div>
          </div>
        </div>
      </section>

        </>
    )
}
export default Cta;