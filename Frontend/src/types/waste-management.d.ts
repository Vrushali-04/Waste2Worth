
// Material category type
export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Collection point type
export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  operating_hours?: string;
  description?: string;
  contact_info?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

// Recycling activity type
export interface RecyclingActivity {
  id?: string;
  user_id?: string;
  collection_point_id: string;
  material_category_id: string;
  weight_kg?: number;
  date_recycled?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
