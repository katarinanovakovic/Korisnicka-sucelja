'use client'
import CommentForm from '@/components/addComment/page';
import React, { useState, useEffect } from 'react';
import "./recipesDetails.css";
import renderStars from "@/components/stars/page";
import RecentRecipes from '@/components/recentRecipes/page';
import Image from "next/image";

interface Params {
  id: number;
}

export interface RecipesCategoriesParams {
  params: Params;
}

interface CommentFields {
  author: string;
  text: string;
}

interface Comment {
  sys: {
    id: string;
  };
  fields: CommentFields;
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
  nutritions: string;
  description:string;
}

interface Recipe {
  sys: {
    id: string;
  };
  fields: RecipeFields;
}

export default function RecipsDetails({ params }: RecipesCategoriesParams) {
  const [entry, setEntry] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentful = require('contentful');
        const client = contentful.createClient({
          space: 'c2epmrmqiqap',
          accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
        });

        const response = await client.getEntries({
          content_type: 'recipe',
          'sys.id': params.id.toString(),
          include: 3, 
        }) as { items: Recipe[] };

        if (response.items.length > 0) {
          setEntry(response.items[0]);
        } else {
          console.warn(`Recipe with ID ${params.id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, [params.id]);

  const handleToggleNavBar = () => {
    setIsNavBarVisible((prevValue) => !prevValue);
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <p>Loading...</p>
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <p>Recipe not found.</p>
      </main>
    );
  }



  return (
    <>
    <main className="main-container">
      <div className="pageimage">
          {entry.fields.postimage?.fields?.file?.url ? (
            <Image src={entry.fields.postimage.fields.file.url} alt={entry.fields.name} />
          ) : (
            <span>No Image</span>
          )}
        </div>
      <div className="recipe-details" key={entry?.sys.id}>
        <h1 className="title">{entry?.fields.name}</h1>
        <div className="star-rating">{renderStars(entry.fields.rating)}</div>
        <h3>{entry?.fields.description}</h3>
        <div className="display">
          <div className="display-line">
            <p className="first-line">{entry?.fields.cookingTime}</p>
            <p className="second-line">mins</p>
          </div>
          <div className="display-line">
            <p className="first-line">{entry?.fields.nutritions}</p>
            <p className="second-line">nutritions</p>
          </div>
          <div className="display-line">
            <p className="first-line">{entry?.fields.ingredients.length}</p>
            <p className="second-line">ingredients</p>
          </div>
        </div>
        <div className="diet">
          <p className= "diet-title">Dietary preferences</p>
          {entry?.fields.diet.map((preference, index) => (
            <p className = "preference" key={index}>{preference}</p>
          ))}
        </div>
      </div>
    </main>
    <div className="flex w-full mt-20">
  <div className="ingredients">
    <p className="section-title">Ingredients:</p>
    {entry?.fields.ingredients.map((ingredient, index) => (
      <p className="ingredient" key={index}>
        {ingredient}
        {index !== entry.fields.ingredients.length - 1 && <br />}
      </p>
    ))}
  </div>

  <div className="instructions">
    <p className="section-title">Instructions:</p>
    <p>{entry?.fields.instructions}</p>
  </div>

  <div className="recent-added-recipes"><RecentRecipes/></div>
</div>
        <CommentForm recipeId={entry?.sys.id} />
        <div className="comment-section">
          <p className="section-title">Comments:</p>
          <ul className="comments-list">
            {entry?.fields.comments ? (
              entry.fields.comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  <strong>{comment.fields.author}:</strong> {comment.fields.text}
                </li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>
        </div>
        </>
  );
  
  
}
