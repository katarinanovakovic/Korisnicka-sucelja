'use client'
import React, { useEffect, useState } from 'react';
import Footer from '../footer/page';

interface Image {
  sys: {
    id: string;
  };
  fields: ImageFields;
}

interface ImageFields {
  image: any;
}

const contentful = require('contentful');
const client = contentful.createClient({
  space: 'c2epmrmqiqap',
  accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
});

const Homepage = () => {
  const [image, setImage] = useState<Image[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'image',
        }) as { items: Image[] };

        setImage(response.items);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col bg-white">
      <div className="flex flex-col md:flex-row bg-white">
        <div className="md:w-1/2">
          <div className="text-6xl md:text-9xl font-bold mx-4 md:mx-20 my-10 text-custom-main-color text-center font-arial-rounded">
            HEALTHY
            <br />
            AND
            <br />
            EASY
          </div>
          <div className="text-lg mb-20 md:mb-0 md:text-xl font-bold mx-4 md:m-20 text-font text-center">
            Wholesome Recipes Made Simple:
            <br />
            Discover a World of Healthy Culinary Delights!
          </div>
        </div>
        <div className="bg-custom-main-color flex flex-1 justify-center xl:justify-end items-center rounded-tl-full rounded-bl-full mt-[-50px] xl:mt-[-100px]">
          {image.length > 0 && image[1].fields.image?.fields?.file?.url ? (
            <img className="w-full h-full object-fit" src={image[1].fields.image.fields.file.url} alt={image[1].sys.id} />
          ) : (
            <span>No Image</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:flex md:w-1/2 h-80 md:h-auto">
          {image.length > 0 && image[0]?.fields?.image?.fields?.file?.url ? (
            <img
              className="w-full h-full object-cover"
              src={image[0].fields.image.fields.file.url}
              alt={image[0].sys.id}
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <div className="md:w-1/2 max-w-[800px] py-10 px-4">
          <h1 className="text-2xl md:text-3xl text-custom-main-color font-bold font-arial-rounded">
            Wholesome Cooking Simplified
          </h1>
          <p className="text-lg md:text-xl leading-normal mb-10 md:mb-20 mt-5 text-font-color">
            Explore our collection of easy recipes designed for both seasoned
            chefs and kitchen novices. Step into the world of fresh, whole
            ingredients with our user-friendly guides, ensuring a delightful and
            nutritious cooking experience.
          </p>
          <h1 className="text-2xl md:text-3xl text-custom-main-color font-bold font-arial-rounded">
            Diverse, Flavorful, and Nutritious
          </h1>
          <p className="text-lg md:text-xl leading-normal mb-10 md:mb-20 mt-5 text-font-color">
            From vibrant salads to hearty one-pan wonders, our diverse recipes
            cater to various cuisines and dietary preferences. Celebrate the
            natural flavors of ingredients while following gluten-free,
            vegetarian, or low-carb options for a delicious and nourishing meal.
          </p>
          <h1 className="text-2xl md:text-3xl text-custom-main-color font-bold font-arial-rounded">
            Quick and Easy Meals
          </h1>
          <p className="text-lg md:text-xl leading-normal mb-10 md:mb-20 mt-5 text-font-color">
            Embrace nutritious eating without the time-consuming hassle. Our
            recipes are tailored to fit your busy schedule, offering quick
            solutions without compromising on taste. Minimal prep time and
            straightforward instructions guarantee a wholesome feast in no time.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Homepage;
