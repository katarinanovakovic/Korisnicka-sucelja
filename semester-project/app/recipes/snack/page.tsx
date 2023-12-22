import RecipesList from "../../recipesList/page";
export default function Snack() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-3xl font-bold">Snack</h1>
      <RecipesList name = "snack"/>
    </main>
  );
}
