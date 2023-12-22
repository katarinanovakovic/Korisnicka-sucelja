import { Recipe } from "../page";
import React from "react";

interface Params {
  id: string; // Adjust the parameter name to match the dynamic folder naming
}

const getRecipe = async (id: string): Promise<Recipe> => {
  const data = await import("../../json/recipes.json");
  const recipes: Recipe[] = data.recipes;
  const recipe = recipes.find((recipe) => recipe.id.toString() === id);
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  return recipe;
};

export default async function RecipesDetail({ params }: { params: Params }) {
  try {
    const recipe = await getRecipe(params.id);

    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <h1 className="text-3xl font-bold p-10 capitalize">
          <span className="text-neutral-400">Recipe {recipe.id}:</span> {recipe.name}
        </h1>
        <p className="text-xl p-10">{recipe.ingredients.map((ingredient, index) => (
          <React.Fragment key={index}>
            {ingredient}
            {index !== recipe.ingredients.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
      <p className="text-xl p-10">{recipe.instructions.map((instruction, index) => (
          <React.Fragment key={index}>
            {instruction}
            {index !== recipe.instructions.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <h1 className="text-3xl font-bold p-10 capitalize">
          Post Not Found
        </h1>
      </main>
    );
  }
}

