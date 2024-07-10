import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/app/recipes/[category]/recipes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext';

interface Recipe {
  sys: {
    id: string;
  };
  fields: RecipeFields;
}

interface RecipeFields {
  name: string;
  category: string[];
  diet: string[];
  difficulty: string;
  cookingTime: number;
  ingredients: string[];
  instructions: string;
  postimage?: any;
  comments: Comment[];
  rating: number;
}

interface UserFields {
  userName: string;
  savedRecipes: Recipe[];
}

interface User {
  sys: {
    id: string;
  };
  fields: UserFields;
}

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'c2epmrmqiqap',
  accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
});

export default function DisplaySavedRecipes() {
  const [user, setUser] = useState<User | null>(null);
  const [recipeCount, setRecipeCount] = useState<number>(0);
  const { username } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = (await client.getEntries({
          content_type: 'user',
          'fields.userName': username,
          include: 2,
        })) as { items: User[] };

        if (userResponse.items.length > 0) {
          const foundUser = userResponse.items[0];
          console.log('Found User:', foundUser.fields.userName);
          setUser(foundUser);
          const savedRecipes = foundUser.fields.savedRecipes || [];
          setRecipeCount(savedRecipes.length);
          console.log(foundUser.fields.savedRecipes);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10 mt-[-50px] md:mt-0">
      <h1 className="text-5xl md:text-7xl font-bold p-10 capitalize text-custom-main-color font-arial-rounded">
        Saved Recipes
      </h1>
      <div className="flex justify-center w-full">
        <div className="text-base md:text-2xl">
          You have <span className="text-custom-main-color font-bold">{recipeCount}</span> recipes to explore
        </div>
      </div>

      <br />
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
      {user && user.fields && user.fields.savedRecipes && user.fields.savedRecipes.length > 0 ? (
          user.fields.savedRecipes.map((recipe, index) => (
            <div key={index} className="relative w-full border-2 mt-16 bg-white p-5 shadow-xl text-center rounded-3xl">
              <Link href={`/recipes/${recipe.fields.category}/${recipe.sys.id}`}>
                {recipe.fields.postimage?.fields?.file?.url ? (
                   <div className = "h-[250px] relative -top-8 shadow-md rounded-[40px]"><img className = "w-full h-full object-fit rounded-[40px]" src={recipe.fields.postimage.fields.file.url} alt={recipe.fields.name} /></div>
                ) : (
                  <span>No Image</span>
                )}
                <div className="text-lg font-bold text-custom-main-color text-left">{recipe.fields.name}</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex"> Cooking Time: {recipe.fields.cookingTime} mins</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex"> Difficulty: {recipe.fields.difficulty}</div>
                <div className="text-sm text-gray-600 mt-4 mb-4 flex">Ingredients: {recipe.fields.ingredients ? recipe.fields.ingredients.length : 0}</div>
                <div className="flex justify-between">
                <div className="text-1xl text-gray-600 m-2 flex">
                  <FontAwesomeIcon className="text-2xl mr-2 text-custom-main-color" icon={faComment}/>
                  {recipe.fields.comments ? recipe.fields.comments.length : 0}
                </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No saved recipes found.</div>
        )}
      </div>
    </main>
  );
}
