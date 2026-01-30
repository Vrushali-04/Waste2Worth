
import { ClipboardCheck, Search, Zap, HandshakeIcon, BarChart3, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-600 to-eco-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How Waste2Worth Works</h1>
              <p className="text-lg md:text-xl text-white/90">
                A simple, efficient process to buy, sell, and recycle waste materials
                through our innovative platform.
              </p>
            </div>
          </div>
        </section>
        
        {/* Step by Step Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Your Journey with Waste2Worth</h2>
              
              <div className="space-y-20">
                {/* Step 1 */}
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <ClipboardCheck className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">1. Sign Up</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Create your free account in minutes. Choose your role as an individual, 
                      business, or recycler to customize your experience.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 bg-gray-50 rounded-xl p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Fill in basic contact information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Select your role: Individual, Business, or Recycler</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Verify your email address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Complete your profile with location details</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="grid md:grid-cols-5 gap-6 items-center md:flex-row-reverse">
                  <div className="md:col-span-2 md:order-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <Search className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">2. Choose Your Goal</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Decide whether you want to buy, sell, or recycle waste materials. 
                      Our platform adapts to your specific needs.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 md:order-1 bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border border-eco-100 rounded-lg p-4 text-center hover:bg-eco-50 transition-colors">
                        <h4 className="font-bold mb-2">Buy</h4>
                        <p className="text-sm text-gray-600">Find recycled materials for your projects and products</p>
                      </div>
                      
                      <div className="border border-eco-100 rounded-lg p-4 text-center hover:bg-eco-50 transition-colors">
                        <h4 className="font-bold mb-2">Sell</h4>
                        <p className="text-sm text-gray-600">List your waste materials for interested buyers</p>
                      </div>
                      
                      <div className="border border-eco-100 rounded-lg p-4 text-center hover:bg-eco-50 transition-colors">
                        <h4 className="font-bold mb-2">Recycle</h4>
                        <p className="text-sm text-gray-600">Find responsible recycling options for your waste</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <Zap className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">3. Browse or List Items</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Explore available materials or create detailed listings for your waste. 
                      Our categories make it easy to find what you need.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-bold mb-2">For Buyers/Recyclers:</h4>
                        <p className="text-sm text-gray-600">
                          Search by material type, location, quantity, and price range. 
                          Filter for verified sellers and sustainable practices.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2">For Sellers:</h4>
                        <p className="text-sm text-gray-600">
                          Create detailed listings with photos, descriptions, quantity, 
                          condition, and pricing. Our system suggests optimal categories.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="grid md:grid-cols-5 gap-6 items-center md:flex-row-reverse">
                  <div className="md:col-span-2 md:order-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <BarChart3 className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">4. AI-Powered Matching</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Our intelligent system automatically connects you with the best matches 
                      based on your needs, location, and sustainability goals.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 md:order-1 bg-gray-50 rounded-xl p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Smart recommendations based on your preferences and history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Location optimization to reduce transportation emissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Material compatibility analysis for recyclers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-eco-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span>Price optimization suggestions for sellers</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <HandshakeIcon className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">5. Connect and Deal</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Communicate securely through our platform, negotiate terms, 
                      and finalize transactions with confidence.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-bold mb-2">Secure Messaging</h4>
                        <p className="text-sm text-gray-600">
                          Our built-in messaging system keeps your contact information 
                          private until you're ready to share it.
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-bold mb-2">Transaction Protection</h4>
                        <p className="text-sm text-gray-600">
                          Optional escrow services and verification steps ensure 
                          both parties fulfill their commitments.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2">Logistics Support</h4>
                        <p className="text-sm text-gray-600">
                          Recommendations for eco-friendly transportation and 
                          handling of materials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 6 */}
                <div className="grid md:grid-cols-5 gap-6 items-center md:flex-row-reverse">
                  <div className="md:col-span-2 md:order-2">
                    <div className="bg-eco-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                      <BarChart3 className="h-8 w-8 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center md:text-left">6. Track Your Impact</h3>
                    <p className="text-gray-600 text-center md:text-left">
                      Monitor your environmental contribution with detailed analytics 
                      and achievement badges on your personal dashboard.
                    </p>
                  </div>
                  
                  <div className="md:col-span-3 md:order-1 bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Every transaction on Waste2Worth contributes to a cleaner planet. 
                        We measure and report your positive impact:
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-eco-100 rounded-lg p-4 text-center">
                          <p className="font-bold text-2xl text-eco-600">0</p>
                          <p className="text-sm">kg of waste diverted from landfills</p>
                        </div>
                        
                        <div className="border border-eco-100 rounded-lg p-4 text-center">
                          <p className="font-bold text-2xl text-eco-600">0</p>
                          <p className="text-sm">kg CO₂ emissions reduced</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-earth-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-gray-700">
                Join thousands of individuals and businesses making a difference through 
                responsible waste management. Every small action adds up to huge impact!
              </p>
              
              <Button 
                size="lg" 
                className="bg-eco-500 hover:bg-eco-600 flex items-center mx-auto gap-2"
                onClick={() => navigate('/get-started')}
              >
                Start Your Journey <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
