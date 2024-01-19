'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import SearchBox from "@/components/searchbox/page";
import FilterBox from "@/components/filterBox/page";
import "./recipes.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faClock, faUtensils, faComment } from '@fortawesome/free-solid-svg-icons';

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
    // Toggle the state to show/hide the FilterBox
    setShowFilterBox((prevShowFilterBox) => !prevShowFilterBox);
  };

  const handleFilterClose = () => {
    // Handle filter box close logic
    setShowFilterBox(false);
  };

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
      .filter(entry => diets.length === 0 || entry.fields.diet.some(diet => diets.includes(diet)))
      .filter(entry => !difficulty || entry.fields.difficulty === difficulty)
      .filter(entry => maxCookingTime === 0 || entry.fields.cookingTime <= maxCookingTime);
  
    setFilteredEntries(filtered);
    setShowFilterBox(false);
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
        setRecipeCount(response.items.length); 
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
    <button onClick={handleShowFilterBoxClick}>
        <FontAwesomeIcon icon={faFilter} className="mr-2" />
        Filters
      </button>
    {showFilterBox && <div className="filter-box-overlay"></div>}
    {showFilterBox && (
      <div className="filter-box-container">
        <FilterBox
          onFilterSubmit={handleFilterSubmit}
          onFilterUndo={handleFilterUndo}
          onClose={handleFilterClose}
        />
      </div>
    )}
      <h1 className="text-3xl font-bold p-10" style={{ textTransform: 'capitalize' }}>{params.category} Recipes</h1>
      <div className="flex justify-between w-full">
  <SearchBox onSearch={handleSearch} />
  <div className="recipe-count ml-auto">
          You have <span style={{ fontWeight: 'bold' }}>
            {filteredEntries
              .filter(entry => entry.fields.category.includes(params.category))
              .filter(entry => entry.fields.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .length
            }
          </span> recipes to explore
        </div>
</div>

      <br></br>
      <br></br>
      <div className="recipe-container">
        {filteredEntries
          .filter(entry => entry.fields.category.includes(params.category))
          .filter(entry => entry.fields.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(entry => (
            <div key={entry.sys.id} className="recipe-box">
              <Link href={`/recipes/${params.category}/${entry.sys.id}`}>
                {entry.fields.postimage?.fields?.file?.url ? (
                  <img src={entry.fields.postimage.fields.file.url}
                    alt={entry.fields.name} />
                ) : (
                  <span>No Image</span>
                )}
                <div className="recipe-name">{entry.fields.name}</div>
                <div className="cooking-time"> Cooking Time: {entry.fields.cookingTime} mins</div>
                <div className="difficulty-level"> Difficulty: {entry.fields.difficulty}</div>
                <div className="ingredient-count">Ingredients: {entry.fields.ingredients.length}</div>
                <div className="comment-count"><FontAwesomeIcon icon={faComment} />{entry.fields.comments ? entry.fields.comments.length : 0}
</div>
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
};
