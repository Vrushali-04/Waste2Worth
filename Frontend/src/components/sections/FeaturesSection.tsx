
import { Brain, ChartBar, DollarSign, Gift, Users, ShoppingBag } from "lucide-react";

const features = [
  {
    title: "AI-Powered Waste Exchange",
    description: "Smart matching between waste providers and recyclers using our advanced recommendation algorithms.",
    icon: Brain
  },
  {
    title: "Sustainability Tracking",
    description: "Track your waste contributions and see the real environmental impact you're making every day.",
    icon: ChartBar
  },
  {
    title: "Sell & Earn from Waste",
    description: "List recyclable materials for businesses & upcyclers to buy and earn money from your waste.",
    icon: DollarSign
  },
  {
    title: "Donate for a Cause",
    description: "Option to donate usable items to NGOs or individuals in need, making a social impact.",
    icon: Gift
  },
  {
    title: "Eco-Friendly Community",
    description: "Engage with like-minded people and learn sustainable habits from our growing community.",
    icon: Users
  },
  {
    title: "Marketplace for Recycled Products",
    description: "Purchase upcycled or recycled products from our network of verified sustainable sellers.",
    icon: ShoppingBag
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3" 
              alt="Recycling Process" 
              className="rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 mb-8">
              Our platform offers unique features designed to make recycling easier, more rewarding, and measurably impactful.
            </p>
            
            <div className="grid gap-6">
              {features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-4"
                >
                  <div className="h-12 w-12 bg-eco-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-eco-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.slice(3).map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-12 w-12 bg-eco-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-eco-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
