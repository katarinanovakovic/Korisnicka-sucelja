'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import SearchBox from "../../searchBox/page";
import FilterBox from "../../filterBox/page";

interface Params {
  category: string;
}

export interface RecipesCategoriesParams {
  params: Params;
}

interface RecipeFields {
  id: number;
  name: string;
  category: string[];
  diet: string[];
  difficulty: string;
  cookingTime:number;
  ingredients: string[];
  instructions: string;
}

interface Recipe {
  sys: {
    id: string;
  };
  fields: RecipeFields;
}

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'c2epmrmqiqap',
  accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
});

const BASE_API_URL = "https://api.eu.contentful.com";

export default function RecipesCategories({ params }: RecipesCategoriesParams) {
  const [entries, setEntries] = useState<Recipe[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [maxCookingTime, setMaxCookingTime] = useState<number>(60);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSubmit = (diets: string[], difficulty: string, maxCookingTime: number) => {
    // Update the state with the selected filters
    setSelectedDiets(diets);
    setSelectedDifficulty(difficulty);
    setMaxCookingTime(maxCookingTime);
  
    // Filter entries based on selected filters
    const filtered = entries
      .filter(entry => entry.fields.category.includes(params.category))
      .filter(entry => diets.length === 0 || entry.fields.diet.some(diet => diets.includes(diet)))
      .filter(entry => !difficulty || entry.fields.difficulty === difficulty)
      .filter(entry => maxCookingTime === 0 || entry.fields.cookingTime <= maxCookingTime);
  
    setFilteredEntries(filtered);
  };

  const handleFilterUndo = () => {
    // Clear selected filters and reset filtered entries
    setSelectedDiets([]);
    setSelectedDifficulty('');
    setMaxCookingTime(60);
    setFilteredEntries(entries);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'recipe',
        }) as { items: Recipe[] };

        setEntries(response.items);
        setFilteredEntries(response.items);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <FilterBox
        onFilterSubmit={handleFilterSubmit}
        onFilterUndo={handleFilterUndo}
      />
      <h1 className="text-3xl font-bold p-10" style={{ textTransform: 'capitalize' }}>{params.category} Recipes</h1>
      <SearchBox onSearch={handleSearch} />
      <br></br>
      <ul className="flex flex-col gap-8">
        {filteredEntries
        .filter(entry => entry.fields.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(entry => (
          <li key={entry.fields.id}>
            <Link href={`/recipes/${params.category}/${entry.fields.id}`}>
              <span className="text-2xl text-purple-500">{entry.fields.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
