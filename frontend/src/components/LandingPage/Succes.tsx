"use client";
import {
  FaStar,
} from 'react-icons/fa';
const Success=()=>{
    return(
        <>
         {/* Success Stories */}
      <section id="success" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories That
              <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Inspire Transformation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real businesses, real results, real transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Transport Co.',
                location: 'Mumbai, Maharashtra',
                result: '300% Revenue Growth',
                quote: 'Logi-Hub transformed our small transport business into a thriving operation. The AI recommendations helped us optimize routes and increase our load factor dramatically.',
                avatar: 'R',
                rating: 5
              },
              {
                name: 'Fresh Fruits Export',
                location: 'Nashik, Maharashtra',
                result: '50% Cost Reduction',
                quote: 'Finding reliable transporters was our biggest challenge. Now we get instant quotes and real-time tracking. Our logistics costs have dropped by half!',
                avatar: 'F',
                rating: 5
              },
              {
                name: 'Sharma Logistics',
                location: 'Delhi, NCR',
                result: '24/7 Operations',
                quote: 'The AI never sleeps! We get bookings round the clock and the smart pricing ensures we are always competitive. Best decision we ever made.',
                avatar: 'S',
                rating: 5
              }
            ].map((story, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {story.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{story.name}</h4>
                      <p className="text-gray-500 text-sm">{story.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 italic">&quot;{story.quote}&quot;</p>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">{story.result}</div>
                      <div className="text-gray-600 text-sm font-medium">Achieved in 6 months</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        </>
    )
}
export default Success;