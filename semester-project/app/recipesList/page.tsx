import Link from "next/link";

// Import the JSON file directly
import data from "../json/recipes.json";

export interface Recipe {
  id: number;
  category:string[];
  name: string;
  ingredients:string[];
  instructions:string[];
}

interface ComponentProps {
    name : string;
}

const RecipesList: React.FC<ComponentProps> = ({name}) => {
  const recipes: Recipe[] = data.recipes; 

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <ul className="flex flex-col gap-8">
        {recipes.map((recipe) => (
            (recipe.category. includes(name)) ? (
                <li key={recipe.id}>
            <Link href={`/recipesList/${recipe.id}`}>
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

export default RecipesList;