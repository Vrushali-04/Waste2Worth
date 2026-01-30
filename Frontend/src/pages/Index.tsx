
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <TestimonialsSection />
        
        {/* Search Section */}
        <section className="py-16 bg-gradient-to-br from-eco-700 to-eco-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Find Waste Collection Points Near You
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                    placeholder="Search by material or category..." 
                  />
                </div>
                
                <div className="relative md:w-1/3">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                    placeholder="Enter your location" 
                  />
                </div>
                
                <Button className="h-12 bg-white text-eco-700 hover:bg-white/90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Preview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Latest from Our Blog</h2>
              <p className="text-gray-600">Tips on sustainable living, recycling news, and success stories.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((blog) => (
                <div key={blog} className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="h-48 bg-eco-100"></div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-eco-600 bg-eco-50 px-2 py-1 rounded-full">
                      Sustainability
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-2">
                      5 Creative Ways to Reuse Plastic Waste at Home
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Discover simple DIY projects that can transform your plastic waste into useful items for everyday use.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Apr 22, 2025</span>
                      <Button variant="link" className="text-eco-600 p-0 h-auto">Read More</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" className="border-eco-200 text-eco-700">
                View All Articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-earth-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Join our community of environmental champions and start turning your waste into valuable resources today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-eco-500 hover:bg-eco-600"
                  asChild
                >
                  <Link to="/auth">Sign Up Now</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-eco-300 text-eco-700"
                  asChild
                >
                  <Link to="/how-it-works">Learn More</Link>
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

export default Index;
