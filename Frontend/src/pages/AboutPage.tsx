
import { Leaf, Users, Lightbulb, Shield, CheckCircle, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-600 to-eco-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Waste2Worth</h1>
              <p className="text-lg md:text-xl text-white/90">
                Transforming how we think about waste through technology,
                community, and sustainable practices.
              </p>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-eco-50 p-8 rounded-xl border border-eco-100">
                <h2 className="text-2xl font-bold mb-4 text-eco-800">Our Vision</h2>
                <p className="text-gray-700">
                  We envision a world where waste is no longer viewed as a burden, 
                  but as a valuable resource with untapped potential. A world where 
                  circular economy principles drive innovation and create sustainable 
                  communities across the globe.
                </p>
              </div>
              
              <div className="bg-eco-50 p-8 rounded-xl border border-eco-100">
                <h2 className="text-2xl font-bold mb-4 text-eco-800">Our Mission</h2>
                <p className="text-gray-700">
                  To revolutionize waste management by connecting individuals, businesses, 
                  and recyclers through an intuitive platform powered by AI and location-based 
                  technology. We aim to make recycling and repurposing waste materials as 
                  simple as a few clicks, while creating economic opportunities and 
                  measurable environmental impact.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-earth-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center text-eco-600 mb-4">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to environmental preservation and reducing the global 
                  waste footprint through circular economy practices and education.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center text-eco-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of community and bringing together diverse 
                  stakeholders to solve complex waste management challenges collectively.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center text-eco-600 mb-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We embrace cutting-edge technology and creative solutions to transform 
                  waste management and create opportunities where others see problems.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center text-eco-600 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Responsibility</h3>
                <p className="text-gray-600">
                  We hold ourselves accountable for our environmental impact and strive 
                  to operate with integrity, transparency, and ethical business practices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">What We Offer</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our platform provides comprehensive solutions for waste management that benefit 
              individuals, businesses, and the environment alike.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-100 rounded-xl p-6 hover:border-eco-200 transition-all duration-300">
                <h3 className="font-bold text-xl mb-4 text-eco-700">For Individuals</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Easy recycling of household waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Sell unwanted items for extra income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Find affordable recycled materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Track your environmental impact</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-100 rounded-xl p-6 hover:border-eco-200 transition-all duration-300">
                <h3 className="font-bold text-xl mb-4 text-eco-700">For Businesses</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Sustainable waste disposal solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Access to recycled raw materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">ESG reporting and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Waste optimization consulting</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-100 rounded-xl p-6 hover:border-eco-200 transition-all duration-300">
                <h3 className="font-bold text-xl mb-4 text-eco-700">For Recyclers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Expanded reach to waste suppliers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Direct marketplace for recycled products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Advanced logistics planning tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">AI-powered supply prediction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-eco-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Waste2Worth</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-eco-700">AI-Powered Matching</h3>
                  <p className="text-gray-600">
                    Our sophisticated algorithms connect waste producers with the ideal 
                    buyers or recyclers based on material type, quantity, location, and 
                    sustainability goals.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-eco-700">Location-Based Services</h3>
                  <p className="text-gray-600">
                    Find recycling opportunities near you with our advanced mapping 
                    technology, reducing transportation costs and carbon emissions.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-eco-700">Verified Partners</h3>
                  <p className="text-gray-600">
                    All businesses and recyclers on our platform undergo rigorous 
                    verification to ensure legitimate, safe, and environmentally 
                    responsible practices.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-eco-700">Impact Tracking</h3>
                  <p className="text-gray-600">
                    Measure your environmental contribution with detailed metrics 
                    on waste diverted from landfills, carbon emissions saved, and 
                    other sustainability indicators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-eco-600 to-eco-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join the Waste2Worth Community</h2>
              <p className="text-lg mb-8">
                Be part of the solution to one of our planet's most pressing challenges. 
                Together, we can transform waste into worth and build a more sustainable future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-eco-700 hover:bg-white/90"
                  onClick={() => navigate('/auth')}
                >
                  Sign Up Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/how-it-works')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
