
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Filter, Grid, List, MessageSquare, Heart, Search, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getMaterialCategories } from "@/services/materialService";
import type { MaterialCategory } from "@/types/waste-management";

// Mock data for waste material listings
const mockListings = [
  {
    id: "1",
    title: "Mixed Plastic Bottles",
    materialCategory: "Plastic",
    materialCategoryId: "1",
    quantity: "50",
    unit: "kg",
    price: "25",
    isDonation: false,
    location: "Downtown, City",
    description: "Clean plastic bottles, sorted by type. Good condition.",
    createdAt: "2025-04-20",
    user: {
      name: "John Doe",
      rating: 4.8,
    },
    images: ["/plastic-icon.svg"],
  },
  {
    id: "2",
    title: "Scrap Aluminum",
    materialCategory: "Metal",
    materialCategoryId: "2",
    quantity: "30",
    unit: "kg",
    price: "45",
    isDonation: false,
    location: "North District, City",
    description: "Clean aluminum scrap from building renovation.",
    createdAt: "2025-04-19",
    user: {
      name: "Jane Smith",
      rating: 4.5,
    },
    images: ["/metal-icon.svg"],
  },
  {
    id: "3",
    title: "Old Computers & Parts",
    materialCategory: "E-waste",
    materialCategoryId: "3",
    quantity: "10",
    unit: "pcs",
    price: "0",
    isDonation: true,
    location: "West Side, City",
    description: "Working and non-working computers and parts. Free to a good recycler.",
    createdAt: "2025-04-18",
    user: {
      name: "Tech Recycler",
      rating: 5.0,
    },
    images: ["/ewaste-icon.svg"],
  },
  {
    id: "4",
    title: "Used Office Paper",
    materialCategory: "Paper",
    materialCategoryId: "4",
    quantity: "100",
    unit: "kg",
    price: "15",
    isDonation: false,
    location: "Business District, City",
    description: "Clean office paper, no staples or paper clips. Ready for recycling.",
    createdAt: "2025-04-17",
    user: {
      name: "Office Supplies Inc",
      rating: 4.2,
    },
    images: ["/paper-icon.svg"],
  },
  {
    id: "5",
    title: "Glass Bottles & Jars",
    materialCategory: "Glass",
    materialCategoryId: "5",
    quantity: "45",
    unit: "kg",
    price: "10",
    isDonation: false,
    location: "East End, City",
    description: "Clean glass bottles and jars, mix of colors.",
    createdAt: "2025-04-16",
    user: {
      name: "Green Recycler",
      rating: 4.7,
    },
    images: ["/glass-icon.svg"],
  },
  {
    id: "6",
    title: "Organic Compost Material",
    materialCategory: "Organic",
    materialCategoryId: "6",
    quantity: "75",
    unit: "kg",
    price: "8",
    isDonation: false,
    location: "Suburban Area, City",
    description: "Quality organic waste suitable for composting.",
    createdAt: "2025-04-15",
    user: {
      name: "Urban Garden",
      rating: 4.9,
    },
    images: ["/organic-icon.svg"],
  },
];

const BuyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("nearest");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Fetch categories
  const { data: materialCategories = [] } = useQuery<MaterialCategory[]>({
    queryKey: ["materialCategories"],
    queryFn: getMaterialCategories,
  });

  // Filter and sort listings
  const filteredListings = mockListings.filter((listing) => {
    // Filter by price
    const price = listing.isDonation ? 0 : parseFloat(listing.price);
    if (price < priceRange[0] || price > priceRange[1]) return false;
    
    // Filter by category
    if (selectedCategory !== "all" && listing.materialCategoryId !== selectedCategory) return false;
    
    // Filter by search query
    if (
      searchQuery &&
      !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (a.isDonation ? 0 : parseFloat(a.price)) - (b.isDonation ? 0 : parseFloat(b.price));
      case "price-desc":
        return (b.isDonation ? 0 : parseFloat(b.price)) - (a.isDonation ? 0 : parseFloat(a.price));
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "nearest":
      default:
        // In a real app, this would use geolocation to calculate actual distance
        return 0; // For now, keep original order
    }
  });

  const toggleWishlist = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save items to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    
    toast({
      title: wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist",
      description: wishlist.includes(id)
        ? "Item has been removed from your wishlist"
        : "Item has been added to your wishlist",
    });
  };

  const contactSeller = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to contact sellers",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would open a chat or contact form
    toast({
      title: "Contact initiated",
      description: "You can now message the seller about this item",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Recyclable Materials</h1>
              <p className="text-gray-600">Find waste materials for purchase or donation</p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilterOpen(!filterOpen)}
                className="md:hidden flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${viewMode === "grid" ? "bg-eco-500 hover:bg-eco-600" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${viewMode === "list" ? "bg-eco-500 hover:bg-eco-600" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar - hidden on mobile unless filter button is clicked */}
            <div className={`md:w-64 md:block ${filterOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-lg border p-4 sticky top-24">
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search listings..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Material Category</h3>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {materialCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Listing Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="for-sale"
                        className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                      />
                      <label htmlFor="for-sale" className="ml-2 text-sm text-gray-700">
                        For Sale
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="donations"
                        className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                      />
                      <label htmlFor="donations" className="ml-2 text-sm text-gray-700">
                        Donations
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Distance</h3>
                  <Select defaultValue="50">
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                      <SelectItem value="100">Within 100 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-eco-200 text-eco-700"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPriceRange([0, 100]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Sort controls */}
              <div className="bg-white rounded-lg border p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {sortedListings.length} results
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort by:</span>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearest">Nearest to Me</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Listings grid or list */}
              {sortedListings.length > 0 ? (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {sortedListings.map((listing) => (
                    <div
                      key={listing.id}
                      className={`bg-white rounded-lg border overflow-hidden transition-shadow hover:shadow-md ${
                        viewMode === "list" ? "flex flex-col md:flex-row" : ""
                      }`}
                    >
                      {/* Image */}
                      <div 
                        className={viewMode === "list" ? "md:w-1/3" : ""}
                        style={{
                          backgroundImage: `url(${listing.images[0]})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundColor: '#f3f4f6',
                          height: viewMode === "list" ? "160px" : "180px",
                        }}
                      />
                      
                      {/* Content */}
                      <div className={`p-4 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex gap-2 mb-2">
                              <Badge className="bg-eco-100 text-eco-800 hover:bg-eco-200">
                                {listing.materialCategory}
                              </Badge>
                              {listing.isDonation && (
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  Donation
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-2 ${wishlist.includes(listing.id) ? "text-red-500" : ""}`}
                            onClick={() => toggleWishlist(listing.id)}
                          >
                            <Heart className={`h-5 w-5 ${wishlist.includes(listing.id) ? "fill-red-500" : ""}`} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm mt-2 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{listing.location}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <div className="text-sm text-gray-500">Quantity</div>
                            <div>
                              {listing.quantity} {listing.unit}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Price</div>
                            <div className="font-semibold text-eco-600">
                              {listing.isDonation ? "Free" : `$${listing.price}`}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {listing.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 bg-eco-500 hover:bg-eco-600"
                            onClick={() => contactSeller(listing.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          {!listing.isDonation && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-eco-200 text-eco-700"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Buy Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setPriceRange([0, 100]);
                  }}>
                    Reset Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {sortedListings.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" size="sm" className="mx-1">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1 bg-eco-50">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="mx-1">
                    Next
                  </Button>
                </div>
              )}
              
              {/* Recommendations section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Suggested For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockListings.slice(0, 3).map((listing) => (
                    <div
                      key={`rec-${listing.id}`}
                      className="bg-white rounded-lg border overflow-hidden transition-shadow hover:shadow-md"
                    >
                      <div 
                        style={{
                          backgroundImage: `url(${listing.images[0]})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundColor: '#f3f4f6',
                          height: "140px",
                        }}
                      />
                      <div className="p-3">
                        <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">{listing.materialCategory}</span>
                          <span className="font-medium text-eco-600">
                            {listing.isDonation ? "Free" : `$${listing.price}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyPage;
