
import { FoodCategory } from './types';

// Average shelf life in days at optimal storage (Fridge 4°C or Freezer -18°C)
export const SHELF_LIFE_BASE: Record<FoodCategory, { fridge: number; freezer: number; room: number }> = {
  [FoodCategory.DAIRY]: { fridge: 7, freezer: 30, room: 0.5 },
  [FoodCategory.MEAT]: { fridge: 3, freezer: 120, room: 0.1 },
  [FoodCategory.SEAFOOD]: { fridge: 2, freezer: 90, room: 0.1 },
  [FoodCategory.VEGETABLE]: { fridge: 10, freezer: 180, room: 4 },
  [FoodCategory.FRUIT]: { fridge: 14, freezer: 240, room: 7 },
  [FoodCategory.COOKED]: { fridge: 4, freezer: 60, room: 0.2 },
  [FoodCategory.BAKERY]: { fridge: 5, freezer: 90, room: 3 },
  [FoodCategory.FAST_FOOD]: { fridge: 3, freezer: 30, room: 0.5 },
  [FoodCategory.SANDWICH]: { fridge: 2, freezer: 14, room: 0.2 },
  [FoodCategory.OTHER]: { fridge: 10, freezer: 180, room: 5 },
};

export const COLORS = {
  [FoodCategory.DAIRY]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  [FoodCategory.MEAT]: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  [FoodCategory.SEAFOOD]: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  [FoodCategory.VEGETABLE]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  [FoodCategory.FRUIT]: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  [FoodCategory.COOKED]: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  [FoodCategory.BAKERY]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  [FoodCategory.FAST_FOOD]: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  [FoodCategory.SANDWICH]: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  [FoodCategory.OTHER]: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};
