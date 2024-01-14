'use client'
import CommentForm from '@/app/addComment/page';
import React, { useState, useEffect } from 'react';

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
  ingredients: string[];
  instructions: string;
  comments?: Comment[]; // Array of Comment
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
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <div key={entry.sys.id}>
        <h1 className="text-3xl font-bold p-10 capitalize">
          <span className="text-neutral-400">Recipe:</span> {entry.fields.name}
        </h1>
        <p className="text-xl p-10">{entry.fields.ingredients.map((ingredient, index) => (
          <React.Fragment key={index}>
            {ingredient}
            {index !== entry.fields.ingredients.length - 1 && <br />}
          </React.Fragment>
        ))}
        </p>
        <p className="text-xl p-10">{entry.fields.instructions}</p>
        <CommentForm recipeId = {entry.sys.id}/>
        <div>
          <h2 className="text-2xl font-bold p-5">Comments:</h2>
          <ul>
            {entry.fields.comments ? (
              entry.fields.comments.map((comment, index) => (
                <li key={index} className="p-3 border border-gray-300 mb-3">
                  <strong>{comment.fields.author}:</strong> {comment.fields.text}
                </li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
