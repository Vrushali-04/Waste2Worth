
import type { MaterialCategory } from "@/types/waste-management";

// Mock material categories data
const materialCategories: MaterialCategory[] = [
  {
    id: "1",
    name: "Plastic",
    description: "All types of recyclable plastic materials",
    icon_url: "/plastic-icon.svg"
  },
  {
    id: "2",
    name: "Metal",
    description: "Scrap metal and metallic waste",
    icon_url: "/metal-icon.svg"
  },
  {
    id: "3",
    name: "E-waste",
    description: "Electronic waste including devices and components",
    icon_url: "/ewaste-icon.svg"
  },
  {
    id: "4",
    name: "Paper",
    description: "Paper products and cardboard materials",
    icon_url: "/paper-icon.svg"
  },
  {
    id: "5",
    name: "Glass",
    description: "Glass bottles, jars, and other glass waste",
    icon_url: "/glass-icon.svg"
  },
  {
    id: "6",
    name: "Organic",
    description: "Biodegradable waste suitable for composting",
    icon_url: "/organic-icon.svg"
  },
  {
    id: "7",
    name: "Textile",
    description: "Clothing, fabric, and other textile waste",
    icon_url: "/textile-icon.svg"
  }
];

// Get all material categories
export const getMaterialCategories = async (): Promise<MaterialCategory[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return materialCategories;
};

// Get material category by ID
export const getMaterialCategory = async (id: string): Promise<MaterialCategory | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return materialCategories.find(category => category.id === id);
};
