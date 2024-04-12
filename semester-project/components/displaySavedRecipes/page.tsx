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
          'sys.id': username,
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
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10" style={{ textTransform: 'capitalize' }}>
        Saved Recipes
      </h1>
      <div className="flex justify-between w-full">
        <div className="recipe-count ml-auto">
          You have <span style={{ fontWeight: 'bold' }}>{recipeCount}</span> recipes to explore
        </div>
      </div>

      <br />
      <br />
      <div className="recipe-container">
      {user && user.fields && user.fields.savedRecipes && user.fields.savedRecipes.length > 0 ? (
          user.fields.savedRecipes.map((recipe, index) => (
            <div key={index} className="recipe-box">
              <Link href={`/recipes/${recipe.fields.category}/${recipe.sys.id}`}>
                {recipe.fields.postimage?.fields?.file?.url ? (
                  <img src={recipe.fields.postimage.fields.file.url} alt={recipe.fields.name} />
                ) : (
                  <span>No Image</span>
                )}
                <div className="recipe-name">{recipe.fields.name}</div>
                <div className="cooking-time"> Cooking Time: {recipe.fields.cookingTime} mins</div>
                <div className="difficulty-level"> Difficulty: {recipe.fields.difficulty}</div>
                <div className="ingredient-count">Ingredients: {recipe.fields.ingredients ? recipe.fields.ingredients.length : 0}</div>
                <div className="comment-count">
                  <FontAwesomeIcon icon={faComment} />
                  {recipe.fields.comments ? recipe.fields.comments.length : 0}
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
