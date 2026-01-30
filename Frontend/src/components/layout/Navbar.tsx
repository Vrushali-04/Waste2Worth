
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Info, 
  Settings, 
  Recycle, 
  ShoppingCart, 
  DollarSign, 
  LogIn
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/b84642f4-17fb-4c38-9036-09be222f570d.png" 
              alt="Waste2Worth Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl text-gray-800">
              Waste<span className="text-eco-500">2</span>Worth
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-eco-600 text-sm font-medium">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link to="/about" className="flex items-center gap-1 text-gray-600 hover:text-eco-600 text-sm font-medium">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            
            <Link to="/how-it-works" className="flex items-center gap-1 text-gray-600 hover:text-eco-600 text-sm font-medium">
              <Settings className="h-4 w-4" />
              <span>How It Works</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-eco-600 border-eco-200 hover:bg-eco-50 hover:text-eco-700 flex gap-1"
                onClick={() => navigate('/recycle')}
              >
                <Recycle className="h-4 w-4" />
                <span className="hidden md:inline">Recycle</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="text-eco-600 border-eco-200 hover:bg-eco-50 hover:text-eco-700 flex gap-1"
                onClick={() => navigate('/buy')}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden md:inline">Buy</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="text-eco-600 border-eco-200 hover:bg-eco-50 hover:text-eco-700 flex gap-1"
                onClick={() => navigate('/sell')}
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden md:inline">Sell</span>
              </Button>
            </div>
            
            <Button 
              variant="default" 
              className="bg-eco-500 hover:bg-eco-600 flex gap-1"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="h-4 w-4" />
              <span>Login / Signup</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
