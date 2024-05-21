'use client'
import CommentForm from '@/components/addComment/page';
import React, { useState, useEffect } from 'react';
import renderStars from "@/components/stars/page";
import Loading from '@/components/loading/page';
import NotFound from '@/components/notFound/page';
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
        <NotFound/>
      </main>
    );
  }

  return (
    <main className = "flex flex-col align-stretch">
      <div className="w-full h-100 flex m-0 flex-nowrap">
              <div className="w-1/2 h-screen mt-[-100px]" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)' }}>
                {entry.fields.postimage?.fields?.file?.url ? (
                  <img className = "w-full h-full object-cover"src={entry.fields.postimage.fields.file.url} alt={entry.fields.name} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
        <div className="relative w-1/2" key={entry?.sys.id}>
                <h1 className="text-custom-main-color text-6xl font-bold mt-10 font-arial-rounded">{entry?.fields.name}</h1>
                <div>{renderStars(entry.fields.rating)}</div>
                <div className = "text-lg text-font-color mr-20 mt-10">{entry?.fields.description}</div>
                <div className="flex flex-wrap mt-[50px] mb-[100px]">
                  <div className="flex flex-col w-1/3 box-border border-r border-custom-main-color mt-50 pl-10">
                    <p className="text-custom-main-color text-6xl text-left">{entry?.fields.cookingTime}</p>
                    <p className="text-center mt-2">mins</p>
                  </div>
                  <div className="flex flex-col w-1/3 box-border border-r border-custom-main-color mt-50 pl-10">
                    <p className="text-custom-main-color text-6xl text-left">{entry?.fields.nutritions}</p>
                    <p className="text-center mt-2">nutritions</p>
                  </div>
                  <div className="flex flex-col w-1/3 mt-50 pl-10">
                    <p className="text-custom-main-color text-6xl text-left">{entry?.fields.ingredients.length}</p>
                    <p className="text-center mt-2">ingredients</p>
                  </div>
                </div>
                <div className="flex">
                  <p className="text-custom-main-color font-bold text-lg mr-10">Dietary preferences:</p>
                  {entry?.fields.diet.map((preference, index) => (
                    <p className="rounded-full bg-custom-main-color mr-4  text-white p-2" key={index}>{preference}</p>
                  ))}
                </div>
        </div>
      </div>
      <div className="flex justify-around mt-8 mb-8">
                <ol className="w-1/3  shadow-md rounded-3xl p-6 h-full">
                <p className="text-3xl text-custom-main-color font-bold  flex justify-center mb-4" >Instructions</p>
                  {entry?.fields.instructions.map((instruction, index) => (
                    <li className="flex mb-2" key={index}>
                      <div className='text-custom-main-color text-xl font-bold mr-2'>{index + 1}.</div> <div className='text-lg'>{instruction} </div> 
                      {index !== entry.fields.instructions.length - 1 && <br />}
                    </li>
                  ))}
                </ol>
              <div className="w-1/3 h-full shadow-md rounded-3xl  p-6">
              <div className="text-3xl text-custom-main-color font-bold  flex justify-center mb-4">Ingredients</div>
              {entry?.fields.ingredients.map((ingredient, index) => (
                  <p className="flex mb-8" key={index}>
                    <div className='text-custom-main-color text-sm mr-4 '> <FontAwesomeIcon icon={faCircle} /></div>
                    <div className='text-lg'>{ingredient} </div> 
                    {index !== entry.fields.ingredients.length - 1 && <br />}
                  </p>
                ))}

              </div>
      <div className="comment-section">
      <div className="w-full  shadow-md rounded-3xl  p-6">
        <p className="text-3xl text-custom-main-color font-bold  flex justify-center mb-2">Comments</p>
        <ul className="mb-8">
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
        <CommentForm recipeId={entry?.sys.id} />

      </div>
      </div>
      </div>

  </main>
  );
}
