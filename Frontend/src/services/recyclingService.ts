
import type { RecyclingActivity } from "@/types/waste-management";

// Add recycling activity
export const addRecyclingActivity = async (activity: RecyclingActivity): Promise<RecyclingActivity> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock ID and timestamps
  const mockActivity = {
    ...activity,
    id: Math.random().toString(36).substring(2, 9),
    created_by: "123", // Using created_by instead of user_id
    created_at: new Date().toISOString(),
    collection_points: {
      name: "Downtown Recycling Center", // Mock collection point name
      address: "123 Main St, Downtown"
    },
    material_categories: {
      name: "Plastic" // Mock material category name
    }
  };
  
  console.log('New recycling activity added:', mockActivity);
  return mockActivity;
};

// Get user recycling activities
export const getUserRecyclingActivities = async (userId: string): Promise<RecyclingActivity[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock data
  return [
    {
      id: "rec1",
      created_by: userId, // Using created_by instead of user_id
      collection_point_id: "1",
      material_category_id: "1",
      weight_kg: 5.2,
      date_recycled: new Date().toISOString(),
      created_at: new Date().toISOString(),
      collection_points: {
        name: "Downtown Recycling Center",
        address: "123 Main St, Downtown"
      },
      material_categories: {
        name: "Plastic"
      }
    },
    {
      id: "rec2",
      created_by: userId, // Using created_by instead of user_id
      collection_point_id: "3",
      material_category_id: "4",
      weight_kg: 3.8,
      date_recycled: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      collection_points: {
        name: "Eastside Green Hub",
        address: "789 East Blvd, East End"
      },
      material_categories: {
        name: "Glass"
      }
    }
  ];
};
