import Link from "next/link";

  // Import the JSON file directly
import data from "../../json/recipes.json";
  
interface Params {
    category: string;
  }

  
export interface Recipe {
    id: number;
    category:string[];
    name: string;
    ingredients:string[];
    instructions:string[];
  }

export interface RecipesCategoriesParams {
    params: Params;
  }
  
  
export default function RecipesCategories({ params }: RecipesCategoriesParams) {

    const recipes: Recipe[] = data.recipes; 

    return (
        <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
          <h1 className="text-3xl font-bold" style={{ textTransform: 'capitalize' }}>{params.category}</h1>
          <br></br>
          <ul className="flex flex-col gap-8">
            {recipes.map((recipe) => (
                (recipe.category. includes(params.category)) ? (
                    <li key = {params.category}>
                      <Link href={`/recipes/${params.category}/${recipe.id}`}>
                        <span className="text-2xl text-purple-500">
                          {recipe.name}
                        </span>
                      </Link>
                    </li>
                ) : ("")
            ))}
          </ul>
        </main>
      );
  }


