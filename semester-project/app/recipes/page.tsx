import RecipesCategories from "./[category]/page";

export default function Recipes() {

    const category = "all";
    return (
      <main>
        <RecipesCategories params = {{category}}/>
      </main>
    );
}
