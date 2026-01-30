
import type { CollectionPoint } from "@/types/waste-management";

// Mock collection points data
const collectionPoints: CollectionPoint[] = [
  {
    id: "1",
    name: "Downtown Recycling Center",
    address: "123 Main St, Downtown",
    operating_hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
    description: "Full-service recycling center accepting all material types",
    website: "https://example.com/downtown",
    latitude: 40.7128,
    longitude: -74.0060,
    created_by: "system",
    created_at: "2023-01-15T08:00:00Z"
  },
  {
    id: "2",
    name: "Westside Collection Depot",
    address: "456 West Ave, West District",
    operating_hours: "Mon-Sat: 8AM-6PM",
    description: "Specialized in plastic and metal recycling",
    latitude: 40.7580,
    longitude: -73.9855,
    created_by: "system",
    created_at: "2023-02-10T09:30:00Z"
  },
  {
    id: "3",
    name: "Eastside Green Hub",
    address: "789 East Blvd, East End",
    operating_hours: "24/7 Drop-off",
    description: "Self-service drop-off for common recyclables",
    website: "https://example.com/easthub",
    latitude: 40.7312,
    longitude: -73.9800,
    created_by: "system",
    created_at: "2023-03-05T14:15:00Z"
  },
  {
    id: "4",
    name: "North Community Center",
    address: "321 North Rd, Northside",
    operating_hours: "Tue-Thu: 10AM-4PM",
    description: "Community-run recycling point with educational programs",
    latitude: 40.8075,
    longitude: -73.9619,
    created_by: "system",
    created_at: "2023-03-22T11:45:00Z"
  },
  {
    id: "5",
    name: "South Industrial Park",
    address: "654 Industry Way, Southside",
    operating_hours: "Mon-Fri: 7AM-7PM",
    description: "Large-scale recycling facility for industrial waste",
    website: "https://example.com/southpark",
    latitude: 40.6892,
    longitude: -73.9081,
    created_by: "system",
    created_at: "2023-04-18T07:30:00Z"
  }
];

// Get all collection points
export const getCollectionPoints = async (): Promise<CollectionPoint[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return collectionPoints;
};

// Get collection point by ID
export const getCollectionPoint = async (id: string): Promise<CollectionPoint | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return collectionPoints.find(point => point.id === id);
};
