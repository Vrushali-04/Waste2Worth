
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";
import { getMaterialCategories } from "@/services/materialService";
import type { MaterialCategory } from "@/types/waste-management";

const CategoryCard = ({ category }: { category: MaterialCategory }) => {
  return (
    <div className={`rounded-xl p-6 bg-eco-50 border border-eco-100 hover:shadow-md transition-all duration-300 group`}>
      <div className="mb-4">
        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-eco-600 shadow-sm">
          {category.icon_url ? (
            <img src={category.icon_url} alt={category.name} className="h-8 w-8" />
          ) : (
            <Recycle className="h-8 w-8" />
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2 text-gray-800">{category.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
      
      <Button 
        variant="ghost" 
        className="text-sm px-4 py-1 h-auto text-eco-600 hover:bg-white"
      >
        Explore
      </Button>
    </div>
  );
};

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['materialCategories'],
    queryFn: getMaterialCategories
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-eco-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-eco-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Categories of Waste</h2>
          <p className="text-gray-600">
            Browse waste categories and find the perfect match for your recycling, buying, or selling needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-eco-500 hover:bg-eco-600 flex items-center gap-2">
            <Recycle className="h-5 w-5" />
            <span>Select a category & start recycling today!</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
