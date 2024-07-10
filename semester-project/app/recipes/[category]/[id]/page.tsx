'use client'
import CommentForm from '@/components/addComment/page';
import React, { useState, useEffect } from 'react';
import renderStars from "@/components/stars/page";
import Loading from '@/components/loading/page';
import NotFoundPage from '../../../not-found';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

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
  instructions: string[];
  postimage?:any;
  comments?:Comment[];
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
        <Loading/>
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
        <NotFoundPage/>
      </main>
    );
  }

  return (
    <main className = "flex flex-col align-stretch">
      <div className="grid grid-cols-1 md:flex md:flex-nowrap md:items-start">
  {/* Image Section */}
  <div className="relative w-full md:w-1/2">
    <div className="w-full h-[450px] md:h-screen md:mt-[-100px] md:clip-path-custom">
      {entry.fields.postimage?.fields?.file?.url ? (
        <img className="w-full h-full object-cover rounded-xl m-2 md:m-0" src={entry.fields.postimage.fields.file.url} alt={entry.fields.name} />
      ) : (
        <span>No Image</span>
      )}
    </div>
  </div>
  
  {/* Content Section */}
  <div className="w-full ml-4 md:w-1/2">
    <div className="relative" key={entry?.sys.id}>
      <h1 className="text-custom-main-color text-6xl xl:text-7xl font-bold mt-10 font-arial-rounded">{entry?.fields.name}</h1>
      <div>{renderStars(entry.fields.rating)}</div>
      <div className="text-lg text-font-color mr-20 mt-10">{entry?.fields.description}</div>
      <div className="flex flex-wrap mt-5 md:mt-10 mb-10 md:mb-0">
        <div className="flex flex-col w-full md:w-1/3 box-border border-r border-custom-main-color mt-5 md:mt-50 pl-10">
          <p className="text-custom-main-color text-6xl text-left">{entry?.fields.cookingTime}</p>
          <p className="text-center mt-2">mins</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 box-border border-r border-custom-main-color mt-5 md:mt-50 pl-10">
          <p className="text-custom-main-color text-6xl text-left">{entry?.fields.nutritions}</p>
          <p className="text-center mt-2">nutritions</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 mt-5 md:mt-50 pl-10">
          <p className="text-custom-main-color text-6xl text-left">{entry?.fields.ingredients.length}</p>
          <p className="text-center mt-2">ingredients</p>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap mt-20">
        <p className="text-custom-main-color font-bold text-lg mr-10">Dietary preferences:</p>
        {entry?.fields.diet.map((preference, index) => (
          <p className="rounded-full bg-custom-main-color mr-4 text-white p-2" key={index}>{preference}</p>
        ))}
      </div>
    </div>
  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8">
  <div className="col-span-1 md:col-span-1 lg:col-span-1">
    <ol className="shadow-md rounded-3xl p-6 h-full">
      <p className="text-3xl text-custom-main-color font-bold flex justify-center mb-4">Instructions</p>
      {entry?.fields.instructions.map((instruction, index) => (
        <li className="flex mb-2" key={index}>
          <div className='text-custom-main-color text-xl font-bold mr-2'>{index + 1}.</div> 
          <div className='text-lg'>{instruction}</div>
          {index !== entry.fields.instructions.length - 1 && <br />}
        </li>
      ))}
    </ol>
  </div>
  <div className="col-span-1 md:col-span-1 lg:col-span-1">
    <div className="shadow-md rounded-3xl p-6">
      <p className="text-3xl text-custom-main-color font-bold flex justify-center mb-4">Ingredients</p>
      {entry?.fields.ingredients.map((ingredient, index) => (
        <p className="flex mb-8" key={index}>
          <div className='text-custom-main-color text-sm mr-4 '><FontAwesomeIcon icon={faCircle} /></div>
          <div className='text-lg'>{ingredient}</div>
          {index !== entry.fields.ingredients.length - 1 && <br />}
        </p>
      ))}
    </div>
  </div>
  <div className="col-span-1 md:col-span-2 lg:col-span-1">
    <div className="comment-section">
      <div className="shadow-md rounded-3xl p-6">
        <p className="text-3xl text-custom-main-color font-bold flex justify-center mb-2">Comments</p>
        <ul className="mb-8">
  {entry?.fields.comments && Array.isArray(entry.fields.comments) && entry.fields.comments.length > 0 ? (
    entry.fields.comments.map((comment, index) => (
      <li key={index} className="comment-item">
        {comment.fields && comment.fields.author && <strong>{comment.fields.author}:</strong>} {comment.fields && comment.fields.text}
      </li>
    ))
  ) : (
    <p>No comments available.</p>
  )}
</ul>

        <CommentForm recipeId={entry?.sys.id} />
      </div>
    </div>
  </div>
</div>


  </main>
  );
}
