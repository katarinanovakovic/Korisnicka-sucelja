import RecipesList from "../../recipesList/page";
export default function Dinner() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-3xl font-bold">Dinner</h1>
      <RecipesList name = "dinner"/>
    </main>
  );
}
