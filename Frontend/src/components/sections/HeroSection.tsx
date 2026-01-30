import { Button } from "@/components/ui/button";
import { ArrowRight, Package2, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-eco-50 to-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3" 
          alt="Recycling Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="text-left">
            <div className="inline-block bg-eco-100 text-eco-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              ♻️ Sustainable Solutions for a Better Tomorrow
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-eco-800 via-eco-600 to-eco-500 bg-clip-text text-transparent">
              Turn Your Waste into a Resource!
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Buy, Sell, and Recycle materials responsibly with AI-powered matching and sustainability tracking. Join our community making a real environmental impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-eco-500 hover:bg-eco-600 text-white"
                asChild
              >
                <Link to="/get-started">Get Started</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-eco-300 text-eco-700 hover:bg-eco-50"
                asChild
              >
                <Link to="/explore-categories">
                  <Package2 className="h-4 w-4 mr-2" />
                  Explore Categories
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3"
              alt="Recycling Process"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-eco-500 font-bold text-2xl">50k+</span>
                  <span className="text-xs text-gray-500">Waste Recycled</span>
                </div>
                
                <div className="h-8 border-r border-gray-200"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-eco-500 font-bold text-2xl">100k+</span>
                  <span className="text-xs text-gray-500">Happy Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;
