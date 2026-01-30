import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Upload, Info, Clock, Tag } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getMaterialCategories } from "@/services/materialService";
import { useQuery } from "@tanstack/react-query";
import type { MaterialCategory } from "@/types/waste-management";

// Form schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  materialCategoryId: z.string().min(1, "Please select a material category"),
  quantity: z.string().min(1, "Please enter a quantity"),
  unit: z.string().min(1, "Please select a unit"),
  price: z.string().optional(),
  isDonation: z.boolean().default(false),
  location: z.string().min(3, "Please enter a pickup location"),
  description: z.string().optional(),
  pickupAvailable: z.boolean().default(true),
  dropoffAvailable: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SellPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Fetch material categories for dropdown
  const { data: materialCategories = [], isLoading: categoriesLoading } = useQuery<MaterialCategory[]>({
    queryKey: ["materialCategories"],
    queryFn: getMaterialCategories,
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      materialCategoryId: "",
      quantity: "",
      unit: "kg",
      price: "",
      isDonation: false,
      location: "",
      description: "",
      pickupAvailable: true,
      dropoffAvailable: false,
    },
  });

  const watchIsDonation = form.watch("isDonation");

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setImages((prev) => [...prev, ...filesArray].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Toggle preview mode
  const togglePreview = () => {
    const formValid = form.trigger();
    if (formValid) {
      setPreviewMode(!previewMode);
    }
  };

  // Form submission
  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to post a listing",
      });
      navigate("/auth");
      return;
    }

    try {
      setSubmitting(true);
      
      // In a real implementation, you would:
      // 1. Upload images to storage
      // 2. Save the form data to the database
      // 3. Associate the image URLs with the listing
      
      // For now we just show a success message
      toast({
        title: "Listing created successfully!",
        description: watchIsDonation 
          ? "Thank you for your donation. We'll contact you soon." 
          : "Your item has been listed for sale.",
      });
      
      // Reset form after submission
      form.reset();
      setImages([]);
      setPreviewMode(false);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating listing",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-6">Sign In Required</h1>
            <p className="mb-6">Please sign in to list your waste materials for sale or donation.</p>
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {watchIsDonation ? "Donate Materials" : "Sell Materials"}
          </h1>
          <p className="text-gray-600 mb-8">
            List your recyclable waste materials for {watchIsDonation ? "donation" : "sale"} on our platform.
          </p>

          {!previewMode ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., 50kg Mixed Plastic Bottles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="materialCategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material Category</FormLabel>
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
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="E.g., 50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="g">Grams (g)</SelectItem>
                            <SelectItem value="ton">Tons</SelectItem>
                            <SelectItem value="pcs">Pieces</SelectItem>
                            <SelectItem value="bags">Bags</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {!watchIsDonation && (
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (USD)</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="E.g., 25" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="isDonation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>This is a donation</FormLabel>
                        <FormDescription>
                          Check this if you're donating these materials rather than selling them
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input className="pl-10" placeholder="Enter address or area" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="pickupAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Pickup Available</FormLabel>
                          <FormDescription>
                            Buyers can pick up from my location
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dropoffAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Drop-off Available</FormLabel>
                          <FormDescription>
                            I can drop off to the buyer's location
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about the condition, source, or any other relevant information"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel className="block mb-2">Upload Images (Max 5)</FormLabel>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-6 w-6 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or WEBP (MAX. 5 MB each)
                        </p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
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
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="button" 
                    onClick={togglePreview} 
                    variant="outline"
                    className="flex-1"
                  >
                    Preview Listing
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="flex-1 bg-eco-500 hover:bg-eco-600"
                  >
                    {submitting ? "Submitting..." : "Post Listing"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {form.getValues("title")}
                </h2>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-100 text-eco-800">
                    {materialCategories.find(c => c.id === form.getValues("materialCategoryId"))?.name || "Material"}
                  </span>
                  {form.getValues("isDonation") ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Donation
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      For Sale
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{form.getValues("location")}</span>
                </div>
                
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {images.map((image, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(image)}
                        alt={`Product ${i + 1}`}
                        className="rounded-lg object-cover h-48 w-full"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg mb-4">
                    <p className="text-gray-500">No images provided</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                    <p>{form.getValues("quantity")} {form.getValues("unit")}</p>
                  </div>
                  
                  {!form.getValues("isDonation") && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price</h3>
                      <p className="font-semibold text-eco-600">
                        ${form.getValues("price") || "0"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Options</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {form.getValues("pickupAvailable") && (
                      <span className="inline-flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" /> Pickup available
                      </span>
                    )}
                    {form.getValues("dropoffAvailable") && (
                      <span className="inline-flex items-center text-xs text-gray-600">
                        <Tag className="h-3 w-3 mr-1" /> Drop-off available
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {form.getValues("description") || "No description provided."}
                  </p>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 mb-4">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Preview Mode</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    This is a preview of your listing. Submit to make it live on the platform.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="button" 
                    onClick={togglePreview}
                    variant="outline"
                    className="flex-1"
                  >
                    Edit Listing
                  </Button>
                  <Button 
                    type="button" 
                    onClick={form.handleSubmit(onSubmit)} 
                    disabled={submitting}
                    className="flex-1 bg-eco-500 hover:bg-eco-600"
                  >
                    {submitting ? "Submitting..." : "Confirm & Post"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellPage;
