import {
  FaTruck,
  FaGlobe,
  FaMobileAlt,
  FaDesktop,
} from 'react-icons/fa';
const Footer=()=>{
    return(
        <>

          {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl">
                  <FaTruck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Logi-Hub</span>
                  <div className="text-sm text-gray-400">AI-Powered Logistics</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Transforming India&apos;s logistics industry with cutting-edge AI technology. 
                Join thousands of businesses already experiencing the revolution.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <FaMobileAlt className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <FaDesktop className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <FaGlobe className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#benefits" className="block text-gray-400 hover:text-white transition-colors">Benefits</a>
                <a href="#success" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Reference</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Status Page</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 Logi-Hub. Revolutionizing logistics with AI. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
        </>
    )
}
export default Footer;