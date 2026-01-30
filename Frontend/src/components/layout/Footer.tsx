
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">W2R</span>
              </div>
              <h3 className="font-bold text-lg">Waste2Resource</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              We're on a mission to transform waste into valuable resources through our AI-powered platform, connecting waste providers with recyclers.
            </p>
            <p className="text-eco-700 italic text-sm">
              "Together, we can make the world a cleaner, greener place!"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-eco-600 text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-eco-600 text-sm">About</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-eco-600 text-sm">How It Works</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-eco-600 text-sm">Categories</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-eco-600 text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-eco-600 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4 text-eco-500" />
                <span>contact@waste2resource.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="h-4 w-4 text-eco-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 text-eco-500 mt-1" />
                <span>123 Green Street, Eco City,<br />Sustainability State, 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="h-8 w-8 bg-eco-100 hover:bg-eco-200 rounded-full flex items-center justify-center text-eco-700">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 bg-eco-100 hover:bg-eco-200 rounded-full flex items-center justify-center text-eco-700">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 bg-eco-100 hover:bg-eco-200 rounded-full flex items-center justify-center text-eco-700">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 bg-eco-100 hover:bg-eco-200 rounded-full flex items-center justify-center text-eco-700">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <h4 className="font-medium text-sm mb-2">Legal</h4>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link to="/privacy-policy" className="hover:text-eco-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-eco-600">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Waste2Resource. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
