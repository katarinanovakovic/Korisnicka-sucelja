import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment } from '@fortawesome/free-solid-svg-icons';
import "./recentRecipes.css";

interface RecipeFields {
  name: string;
  category: string[];
  cookingTime: number;
  postimage?: any;
  comments: Comment[];
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

export default function RecentRecipes() {
  const [entries, setEntries] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'recipe',
        }) as { items: Recipe[] };

        setEntries(response.items.reverse().slice(0, 3)); // Reverse the order and get the last three entries
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <div className="recent-recipe-container">
      <h1>Latest Recipes</h1>
        {entries.map(entry => (
        <Link key={entry.sys.id} href={`/recipes/${entry.fields.category}/${entry.sys.id}`}>
          <div className="recent-recipe-box">
            <img src={entry.fields.postimage?.fields?.file?.url} alt={entry.fields.name} />
            <div className="recent-recipe-details">
                <div className="recent-recipe-name">{entry.fields.name}</div>
                <div className="recent-cooking-time"><FontAwesomeIcon icon={faClock}/>  {entry.fields.cookingTime} mins</div>
                <div className="recent-comment-count"><FontAwesomeIcon icon={faComment} />{entry.fields.comments ? entry.fields.comments.length : 0}</div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </main>
  );
};
