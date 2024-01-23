'use client'
import React, { useEffect, useState } from 'react';
import "./homepage.css";
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
            const response = (await client.getEntries({
              content_type: 'image',
            })) as { items: Image[] };
    
            setImage(response.items);
          } catch (error) {
            console.error('Error fetching entries:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <main>
            <div className="first-section">
                <div className="left-side">
                    <div className="title">
                        HEALTHY 
                        <br/>
                        AND
                        <br/>
                        EASY
                    </div>
                    <div className="description">
                        Wholesome Recipes Made Simple: 
                        <br/>
                        Discover a World of Healthy Culinary Delights!
                    </div>
                </div>
                <div className="plate">
                {image.length > 0 && image[1].fields.image?.fields?.file?.url ? (
                  <img src={image[1].fields.image.fields.file.url} alt={image[1].sys.id} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              </div>
              <div className="second-section">
             <div className="spices">
                {image.length > 0 && image[0].fields.image?.fields?.file?.url ? (
                    <img src={image[0].fields.image.fields.file.url} alt={image[0].sys.id} />
                ) : (
                    <span>No Image</span>
                )}
                </div>
                <div className="second-description">
                <div className="description-box1">
                    <h1>Wholesome Cooking Simplified:</h1>
                    <p>Explore our collection of easy recipes designed for both seasoned chefs and kitchen novices. Step into the world of fresh, whole ingredients with our user-friendly guides, ensuring a delightful and nutritious cooking experience.</p>
                </div>
                <div className="description-box">
                    <h1>Diverse, Flavorful, and Nutritious:</h1>
                    <p>From vibrant salads to hearty one-pan wonders, our diverse recipes cater to various cuisines and dietary preferences. Celebrate the natural flavors of ingredients while following gluten-free, vegetarian, or low-carb options for a delicious and nourishing meal.</p>
                </div>
                <div className="description-box">
                    <h1>Quick and Easy Meals:</h1>
                    <p>Embrace nutritious eating without the time-consuming hassle. Our recipes are tailored to fit your busy schedule, offering quick solutions without compromising on taste. Minimal prep time and straightforward instructions guarantee a wholesome feast in no time.</p>
                </div>
                </div>
              </div>
              <Footer/>
        </main>
    );

}

export default Homepage;