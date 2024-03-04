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

type RecipeColumn = {
  title?: string;
  id: string;
  value: null | any;
  type: string;
  imgFile?: null | any;
};

export interface ColumnsRecipe {
  // [key: string]: RecipeColumn[] | RecipeColumn[][];
  Profile: RecipeColumn[];
  ingredientList: RecipeColumn[][];
  foodImgList: RecipeColumn[];
}
