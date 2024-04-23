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

export type RecipeColumn = {
  id: string;
  value: string | null;
  type: string;
  title?: string;
  imgFile?: null | any;
  placeholderText?: string;
  option?: [];
};

export interface ColumnsRecipe {
  [key: string]: RecipeColumn[] | RecipeColumn[][];
  // Profile: RecipeColumn[];
  // cookingUtensils: RecipeColumn[][];
  // seasonings: RecipeColumn[][];
  // ingredientList: RecipeColumn[][];
  // foodImgList: RecipeColumn[];
}
//

// export interface UpdatedInsertColumns
//   extends Record<string, RecipeColumn[][] | RecipeColumn[]> {}
