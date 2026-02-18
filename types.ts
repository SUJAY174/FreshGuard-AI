
export enum FoodCategory {
  DAIRY = 'Dairy',
  MEAT = 'Meat & Poultry',
  SEAFOOD = 'Seafood',
  VEGETABLE = 'Vegetables',
  FRUIT = 'Fruits',
  COOKED = 'Cooked Meals',
  BAKERY = 'Bakery',
  FAST_FOOD = 'Fast Food',
  SANDWICH = 'Sandwiches',
  OTHER = 'Other'
}

export enum StorageLocation {
  FRIDGE = 'Fridge',
  FREEZER = 'Freezer',
  ROOM_TEMP = 'Room Temperature'
}

export enum PackagingType {
  OPEN = 'Open',
  SEALED = 'Sealed / Vacuum Packed'
}

export enum RiskLevel {
  FRESH = 'Fresh',
  MODERATE = 'Moderate Risk',
  HIGH = 'High Risk',
  SPOILED = 'Likely Spoiled'
}

export interface FoodReview {
  rating: number; // 1-5
  comment: string;
  actualFreshness: 'as_predicted' | 'better' | 'worse';
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  purchaseDate: string;
  storageLocation: StorageLocation;
  temperature: number; // Celsius
  packaging: PackagingType;
  humidity: number; // Percentage
  exposureTime: number; // Hours outside storage
  notes?: string;
  status: 'active' | 'consumed' | 'discarded';
  image?: string;
  review?: FoodReview;
  isHealthFocus?: boolean; // New: Tracks if the item is a "healthy version"
}

export interface PredictionResult {
  riskScore: number; // 0 to 1
  riskLevel: RiskLevel;
  recommendation: string;
  explanation: string;
  featureImportance: {
    feature: string;
    impact: number; // -1 to 1 (negative reduces risk, positive increases)
  }[];
}

export interface AppState {
  items: FoodItem[];
}
