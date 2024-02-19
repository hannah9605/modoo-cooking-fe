interface Ingredient {
  name: string;
  measurement: string;
}

interface FoodImage {
  repImg?: File;
  fileName?: File;
  content?: string;
}

export interface CookingPost {
  title: string;
  author: string;
  detail: string;
  score: number | null;
  duration: string;
  ingredientList: Ingredient[];
  foodImgList: FoodImage[];
}