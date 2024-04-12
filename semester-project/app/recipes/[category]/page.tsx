'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import FilterBox from "@/components/filterBox/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import SearchBox from '@/components/searchBox/page';
import SaveRecipe from '@/components/saveRecipe/page';


interface Params {
  category: string;
}

export interface RecipesCategoriesParams {
  params: Params;
}

interface RecipeFields {
  name: string;
  category: string[];
  diet: string[];
  difficulty: string;
  cookingTime:number;
  ingredients: string[];
  instructions: string;
  postimage?:any;
  comments:Comment[];
  rating:number;
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

export default function RecipesCategories({ params }: RecipesCategoriesParams) {
  const [entries, setEntries] = useState<Recipe[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [maxCookingTime, setMaxCookingTime] = useState<number>(60);
  const [showFilterBox, setShowFilterBox] = useState<boolean>(false);
  const [recipeCount, setRecipeCount] = useState<number>(0);

  const handleShowFilterBoxClick = () => {
    setShowFilterBox((prevShowFilterBox) => !prevShowFilterBox);
  };

  const handleFilterClose = () => {
    setShowFilterBox(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSubmit = (diets: string[], difficulty: string, maxCookingTime: number) => {
    setSelectedDiets(diets);
    setSelectedDifficulty(difficulty);
    setMaxCookingTime(maxCookingTime);
  
    const filtered = entries
      .filter(entry => diets.length === 0 || entry.fields.diet.some(diet => diets.includes(diet)))
      .filter(entry => !difficulty || entry.fields.difficulty === difficulty)
      .filter(entry => maxCookingTime === 0 || entry.fields.cookingTime <= maxCookingTime);
  
    setFilteredEntries(filtered);
    setShowFilterBox(false);
  };

  const handleFilterUndo = () => {
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
        setRecipeCount(response.items.length); 
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-6xl m-auto p-10">
      <h1 className="text-7xl font-bold p-10 capitalize text-custom-main-color">{params.category} Recipes</h1>
      <div className="flex justify-between w-full">
    <SearchBox onSearch={handleSearch} />
    <div className="text-font-color text-xl">
      You have <span className = "font-bold text-custom-main-color">
        {filteredEntries
          .filter(entry => entry.fields.category.includes(params.category))
          .filter(entry => entry.fields.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .length
        }
      </span> recipes to explore
    </div>
  </div>
  <div className = "flex justify-end w-full mt-5 text-custom-main-color text-xl font-bold">
    <button onClick={handleShowFilterBoxClick}>
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filters
      </button>
  </div>
    {showFilterBox && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 blur-5 z-50"><FilterBox
          onFilterSubmit={handleFilterSubmit}
          onFilterUndo={handleFilterUndo}
          onClose={handleFilterClose}
        /></div>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
        {filteredEntries
          .filter(entry => entry.fields.category.includes(params.category))
          .filter(entry => entry.fields.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(entry => (
            <div key={entry.sys.id} className="relative w-full border-2 mt-16 bg-white p-5 shadow-xl text-center rounded-3xl">
              <Link href={`/recipes/${params.category}/${entry.sys.id}`}>
                {entry.fields.postimage?.fields?.file?.url ? (
                  <div className = "h-[250px] relative -top-8 shadow-md rounded-[40px]"><img className = "w-full h-full object-fit rounded-[40px]" src={entry.fields.postimage.fields.file.url}
                    alt={entry.fields.name} /></div>
                ) : (
                  <span>No Image</span>
                )}
                <div className="text-lg font-bold text-custom-main-color text-left">{entry.fields.name}</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex"> Cooking Time: {entry.fields.cookingTime} mins</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex"> Difficulty: {entry.fields.difficulty}</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex">Ingredients: {entry.fields.ingredients.length}</div>
                </Link>
                <div className="flex justify-between">
                <div className="text-1xl text-gray-600 m-2 flex">
                  <FontAwesomeIcon className="text-2xl mr-2 text-custom-main-color" icon={faComment}/>
                  {entry.fields.comments ? entry.fields.comments.length : 0}
                </div>
                <SaveRecipe recipeEntryId={entry.sys.id} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
