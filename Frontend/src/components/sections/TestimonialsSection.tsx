
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">        
        <div className="bg-gradient-to-r from-eco-100 to-eco-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-eco-800 mb-2">0 kg</h3>
              <p className="text-eco-700">Total Waste Recycled</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-eco-800 mb-2">0 tons</h3>
              <p className="text-eco-700">CO₂ Emission Saved</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-eco-800 mb-2">0</h3>
              <p className="text-eco-700">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
