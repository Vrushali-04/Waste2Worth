
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Upload, Calendar, PackageCheck, Badge, Truck, Search, Clock } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMaterialCategories } from "@/services/materialService";
import { getCollectionPoints } from "@/services/collectionPointService";
import { addRecyclingActivity } from "@/services/recyclingService";
import type { CollectionPoint, MaterialCategory } from "@/types/waste-management";

const formSchema = z.object({
  material_category_id: z.string().min(1, "Please select a material category"),
  weight_kg: z.coerce.number().optional(),
  notes: z.string().optional(),
  collection_point_id: z.string().min(1, "Please select a collection point"),
  date_recycled: z.string().optional(),
  schedule_pickup: z.boolean().default(false),
  pickup_date: z.string().optional(),
  pickup_address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RecyclePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<"form" | "centers">("form");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<CollectionPoint | null>(null);

  const { data: materialCategories = [], isLoading: categoriesLoading } = useQuery<MaterialCategory[]>({
    queryKey: ["materialCategories"],
    queryFn: getMaterialCategories,
  });
  
  const { data: collectionPoints = [], isLoading: pointsLoading } = useQuery<CollectionPoint[]>({
    queryKey: ["collectionPoints"],
    queryFn: getCollectionPoints,
  });
  
  const userStats = {
    totalRecycled: 235,
    co2Saved: 42,
    rewardPoints: 350,
    badges: [
      { name: "Recycling Starter", earned: true },
      { name: "Plastic Master", earned: true },
      { name: "Paper Pro", earned: false },
    ],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material_category_id: "",
      weight_kg: undefined,
      notes: "",
      collection_point_id: "",
      date_recycled: new Date().toISOString().slice(0, 10),
      schedule_pickup: false,
      pickup_date: "",
      pickup_address: "",
    },
  });

  const watchSchedulePickup = form.watch("schedule_pickup");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).slice(0, 3);
      setImages((prev) => [...prev, ...filesArray].slice(0, 3));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to submit recycling activities",
      });
      navigate("/auth");
      return;
    }

    try {
      setSubmitting(true);
      
      await addRecyclingActivity({
        collection_point_id: data.collection_point_id,
        material_category_id: data.material_category_id,
        weight_kg: data.weight_kg,
        notes: data.notes,
        date_recycled: data.date_recycled,
      });
      
      toast({
        title: "Recycling recorded successfully!",
        description: watchSchedulePickup 
          ? "We'll contact you about your pickup request soon." 
          : "Thank you for your contribution to a cleaner planet.",
      });
      
      form.reset();
      setImages([]);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error recording recycling activity",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectCollectionPoint = (point: CollectionPoint) => {
    setSelectedCenter(point);
    form.setValue("collection_point_id", point.id);
    setActiveTab("form");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-6">Sign In Required</h1>
            <p className="mb-6">Please sign in to record your recycling activities and earn rewards.</p>
            <Button onClick={() => navigate("/auth")}>Sign In / Register</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Recycle Waste Materials</h1>
          <p className="text-gray-600 mb-8">Track your recycling activities and reduce your environmental footprint</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "form" | "centers")}>
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="form">Record Recycling</TabsTrigger>
                  <TabsTrigger value="centers">Find Centers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form" className="bg-white rounded-lg border p-6">
                  {selectedCenter && (
                    <div className="bg-eco-50 border border-eco-200 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-eco-800">{selectedCenter.name}</h3>
                          <p className="text-sm text-eco-700 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {selectedCenter.address}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-eco-700"
                          onClick={() => {
                            setSelectedCenter(null);
                            form.setValue("collection_point_id", "");
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {!selectedCenter && (
                        <FormField
                          control={form.control}
                          name="collection_point_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Collection Point</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={pointsLoading}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a recycling center" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {collectionPoints.map((point) => (
                                    <SelectItem key={point.id} value={point.id}>
                                      {point.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select where you recycled your materials or find centers in the "Find Centers" tab
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="material_category_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={categoriesLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select material type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {materialCategories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="weight_kg"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="Optional" {...field} />
                              </FormControl>
                              <FormDescription>
                                Approximate weight if known
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="date_recycled"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Recycled</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel className="mb-0">Add Photos (Optional)</FormLabel>
                          <span className="text-xs text-gray-500">{images.length}/3 images</span>
                        </div>
                        
                        <div className="flex items-center justify-center w-full mb-2">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-6 w-6 mb-2 text-gray-500" />
                              <p className="text-xs text-gray-500">PNG, JPG (MAX. 3 MB each)</p>
                            </div>
                            <Input
                              id="dropzone-file"
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              disabled={images.length >= 3}
                            />
                          </label>
                        </div>
                        
                        {images.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Recycling preview ${index + 1}`}
                                  className="h-20 w-full object-cover rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Additional details about your recycling (optional)"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="schedule_pickup"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Schedule a Pickup</FormLabel>
                              <FormDescription>
                                Request a pickup from your location instead of dropping off
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {watchSchedulePickup && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="pickup_date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pickup Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="pickup_address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pickup Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input className="pl-10" placeholder="Full address" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-eco-500 hover:bg-eco-600"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit Recycling Activity"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="centers" className="bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          className="pl-10" 
                          placeholder="Search by name or address"
                        />
                      </div>
                      <div className="relative md:w-1/3">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          className="pl-10" 
                          placeholder="Enter your location"
                        />
                      </div>
                      <Button className="bg-eco-500 hover:bg-eco-600">Search</Button>
                    </div>
                  </div>
                  
                  <div className="max-h-[500px] overflow-y-auto">
                    {collectionPoints.length > 0 ? (
                      <div className="divide-y">
                        {collectionPoints.map((point) => (
                          <div key={point.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold">{point.name}</h3>
                                <div className="text-sm text-gray-600 mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="h-3.5 w-3.5 mr-1" />
                                    {point.address}
                                  </div>
                                  {point.operating_hours && (
                                    <div className="flex items-center mt-1">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {point.operating_hours}
                                    </div>
                                  )}
                                </div>
                                {point.description && (
                                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    {point.description}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="border-eco-200 text-eco-700 mb-2 w-full"
                                  onClick={() => selectCollectionPoint(point)}
                                >
                                  Select
                                </Button>
                                {point.website && (
                                  <Button 
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 w-full"
                                    asChild
                                  >
                                    <a href={point.website} target="_blank" rel="noopener noreferrer">
                                      More Info
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900">No collection points found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search parameters</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>My Sustainability Impact</CardTitle>
                  <CardDescription>
                    Your contributions to a cleaner planet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-eco-50 rounded-md">
                      <PackageCheck className="h-8 w-8 mx-auto text-eco-600 mb-1" />
                      <div className="text-2xl font-bold text-eco-800">{userStats.totalRecycled}kg</div>
                      <div className="text-xs text-gray-500">Total Recycled</div>
                    </div>
                    <div className="text-center p-3 bg-eco-50 rounded-md">
                      <Badge className="h-8 w-8 mx-auto text-eco-600 mb-1" />
                      <div className="text-2xl font-bold text-eco-800">{userStats.rewardPoints}</div>
                      <div className="text-xs text-gray-500">Reward Points</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-eco-50 rounded-md text-center">
                    <div className="text-xs text-gray-500 mb-1">CO₂ emissions prevented</div>
                    <div className="text-xl font-bold text-eco-800">{userStats.co2Saved} kg</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                      <div 
                        className="bg-eco-500 h-2.5 rounded-full" 
                        style={{ width: `${(userStats.co2Saved / 100) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Next milestone: 50kg CO₂ saved
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>My Badges</CardTitle>
                  <CardDescription>
                    Earn badges by meeting recycling goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.badges.map((badge, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center p-3 rounded-md ${
                          badge.earned ? 'bg-eco-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          badge.earned ? 'bg-eco-100 text-eco-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Badge className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <div className={`font-medium ${badge.earned ? 'text-eco-800' : 'text-gray-500'}`}>
                            {badge.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {badge.earned ? 'Earned' : 'Not yet earned'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full text-eco-600">
                    View All Badges
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Schedule a Pickup</CardTitle>
                  <CardDescription>
                    Let us collect your recyclables from you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-eco-600 mt-0.5 mr-3" />
                    <div className="text-sm">
                      <p>Our team can pick up your recyclable waste from your location.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-eco-600 mt-0.5 mr-3" />
                    <div className="text-sm">
                      <p>Pickups are available Monday to Friday, 9am to 5pm.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-eco-500 hover:bg-eco-600"
                    onClick={() => {
                      setActiveTab("form");
                      form.setValue("schedule_pickup", true);
                    }}
                  >
                    Schedule Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecyclePage;
