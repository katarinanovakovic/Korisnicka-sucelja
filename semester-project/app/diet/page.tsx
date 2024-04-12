import React, { useState, useEffect } from 'react';


interface Recipe {
  id:number;
  name:string;
  category:string[];
  ingredients:string[];
  instructions:string[];
}// Import the Post interface from the appropriate location

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'testing my app',
  accessToken: 'CFPAT-o9OxotxLYg4m5hxoEeoDxKa6M30gvj8MW5NqRIw1oRQ',
});
const BASE_API_URL = "https://cdn.contentful.com"; // Corrected the base API URL

const Diet: React.FC = () => {
  const [entries, setEntries] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'recipe', // Replace with your Content Type ID
        }) as { items: Recipe[] };

        setEntries(response.items);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold p-10">Diet Page</h1>
      <ul className="flex flex-col gap-8">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="text-2xl text-purple-500">
              {/* Use the correct field from your Post interface */}
              Post {entry.name}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Diet;
