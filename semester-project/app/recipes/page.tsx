import RecipesCategories, { RecipesCategoriesParams } from "./[category]/page";

export default function Recipes() {

    const category = "all";
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <RecipesCategories params = {{category}}/>
      </main>
    );
}
