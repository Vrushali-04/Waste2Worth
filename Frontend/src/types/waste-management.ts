
export interface MaterialCategory {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
}

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
  contact_info?: string | null;
  website?: string | null;
  operating_hours?: string | null;
  created_by?: string;
  created_at?: string;
}

export interface RecyclingActivity {
  id?: string;
  created_by?: string;
  collection_point_id: string;
  material_category_id: string;
  weight_kg?: number | null;
  date_recycled?: string;
  notes?: string | null;
  created_at?: string;
  collection_points?: {
    name: string;
    address: string;
  };
  material_categories?: {
    name: string;
  };
}
