
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Package2,
  Recycle,
  Zap,
  Leaf,
  FileText,
  Glasses,
  List,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Plastic",
    icon: Package2,
    description: "Recyclable plastic materials and products",
    popularity: 4.5,
  },
  {
    id: 2,
    name: "Metal",
    icon: Recycle,
    description: "Scrap metal and metallic waste",
    popularity: 4.2,
  },
  {
    id: 3,
    name: "E-Waste",
    icon: Zap,
    description: "Electronic waste and components",
    popularity: 4.0,
  },
  {
    id: 4,
    name: "Organic",
    icon: Leaf,
    description: "Biodegradable and organic waste",
    popularity: 3.8,
  },
  {
    id: 5,
    name: "Paper",
    icon: FileText,
    description: "Paper and cardboard materials",
    popularity: 4.3,
  },
  {
    id: 6,
    name: "Glass",
    icon: Glasses,
    description: "Glass waste and recyclables",
    popularity: 3.9,
  },
  {
    id: 7,
    name: "Mixed",
    icon: List,
    description: "Mixed recyclable materials",
    popularity: 3.5,
  },
];

const ExploreCategories = () => {
  const [sortBy, setSortBy] = useState("popularity");
  const [filters, setFilters] = useState({
    nearby: false,
    recyclableOnly: false,
    urgent: false,
  });

  const handleBrowse = (categoryName: string) => {
    alert(`Browsing ${categoryName} listings...`);
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Explore Categories</h1>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[200px]">
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-6 flex-wrap">
                {Object.entries(filters).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          [key]: checked === true,
                        }))
                      }
                    />
                    <Label htmlFor={key} className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-eco-50 rounded-lg">
                      <category.icon className="w-6 h-6 text-eco-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {category.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleBrowse(category.name)}
                      >
                        Browse Listings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
