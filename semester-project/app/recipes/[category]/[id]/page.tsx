'use client'
import React, { useState, useEffect } from 'react';

interface Params {
  id: number;
}

export interface RecipesCategoriesParams {
  params: Params;
}

interface RecipeFields {
  id: number;
  name: string;
  category: string[];
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

const BASE_API_URL = 'https://api.eu.contentful.com';

export default function RecipsDetails({ params }: RecipesCategoriesParams) {
  const [entry, setEntry] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'recipe',
          'sys.id': params.id.toString(), // Filter by the specified ID
        }) as { items: Recipe[] };

        if (response.items.length > 0) {
          setEntry(response.items[0]); // Set the first matching entry
        } else {
          console.warn(`Recipe with ID ${params.id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchData();
  }, [params.id]); // Trigger the effect when the ID changes

  if (!entry) {
    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <p>Loading...</p>
      </main>
    );
  }


  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <div key={entry.sys.id}>
          <h1 className="text-3xl font-bold p-10 capitalize">
            <span className="text-neutral-400">Recipe {entry.fields.id}:</span> {entry.fields.name}
          </h1>
          <p className="text-xl p-10">{entry.fields.ingredients.map((ingredient, index) => (
            <React.Fragment key={index}>
              {ingredient}
              {index !== entry.fields.ingredients.length - 1 && <br />}
            </React.Fragment>
          ))}
          </p>
          <p className="text-xl p-10">{entry.fields.instructions}</p>
        </div>
    </main>
  );
}
