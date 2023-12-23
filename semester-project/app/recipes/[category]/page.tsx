'use client'
import SearchBox from "@/app/searchBox/page";
import Link from "next/link";
import data from "../../json/recipes.json";
import React from "react";

interface Params {
  category: string;
}

export interface Recipe {
  id: number;
  category: string[];
  name: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipesCategoriesParams {
  params: Params;
}

export default function RecipesCategories({ params }: RecipesCategoriesParams) {
  const recipes: Recipe[] = data.recipes;

  // State to store the search query
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Function to handle search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold" style={{ textTransform: 'capitalize' }}>{params.category}</h1>
      <br></br>
      <SearchBox onSearch={handleSearch} />
      <br></br>
      <ul className="flex flex-col gap-8">
        {recipes
          .filter(recipe => recipe.category.includes(params.category)) // Filter based on category
          .filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter based on search query
          .map(recipe => (
            <li key={recipe.id}>
              <Link href={`/recipes/${params.category}/${recipe.id}`}>
                <span className="text-2xl text-purple-500">{recipe.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}