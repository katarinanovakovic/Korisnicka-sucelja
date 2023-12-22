import RecipesList from "../../recipesList/page";
export default function Dessert() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-3xl font-bold">Dessert</h1>
      <RecipesList name = "dessert"/>
    </main>
  );
}
