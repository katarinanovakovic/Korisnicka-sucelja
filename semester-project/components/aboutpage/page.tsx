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

const Aboutpage = () => {
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
        <main className = "flex flex-col bg-white">
            <div className="flex justify-between bg-white">
                <div className="items-center">
                    <div className="text-8xl font-bold mx-20 my-10 text-custom-main-color text-center font-arial-rounded">
                        ABOUT US 
                        <br/>
                    </div>
                    <div className="text-lg font- max-w-xl m-20 color-red text-font text-elft">
                    We're a passionate team of food enthusiasts who believe 
                    that eating well doesn't have to be complicated. 
                    <br/>
                    Our mission is to empower you with the 
                    knowledge to lead a healthier lifestyle.
                    <br />
                    <br /> 
                    Through our carefully crafted recipes and informative articles, we strive to make healthy eating accessible and enjoyable for everyone. Whether you're looking to incorporate more fruits and vegetables into your diet, explore plant-based alternatives, or simply find inspiration for balanced meals, we're here to guide you every step of the way.                    
                    </div>
                </div>
                <div className="bg-custom-main-color flex flex-1 justify-end items-center rounded-tl-full rounded-bl-full mt-[-100px]">
                {image.length > 0 && image[1].fields.image?.fields?.file?.url ? (
                  <img className = "w-full h-full object-cover" src={image[1].fields.image.fields.file.url} alt={image[1].sys.id} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              </div>
              <div className="flex justify-between bg-white gap-9 m-20">
             < div className='w-1/3 rounded-3xl shadow-lg p-6'>
             <h1 className = "text-3xl text-custom-main-color font-bold  flex justify-center font-arial-rounded">Healthy Living</h1>
                <div className='p-10'>
                Our website encourages healthy living. We believe that good health starts with what you eat, and our platform is designed to inspire and educate individuals on the benefits of nutritious eating, regular physical activity, and overall wellness.  
                </div>
             </div>
             < div className='w-1/3 rounded-3xl shadow-lg p-6'>
             <h1 className = "text-3xl text-custom-main-color font-bold  flex justify-center font-arial-rounded">Offers Quality Recipes</h1>
                <div className='p-10'>
                We offer a selection of quality recipes that have been thoroughly tested and verified. Each recipe is crafted with care, using fresh and wholesome ingredients to ensure delicious results every time. Our goal is to provide our users with reliable and trustworthy recipes they can count on.
                </div>
             </div>
             < div className='w-1/3 rounded-3xl shadow-lg p-6'>
             <h1 className = "text-3xl text-custom-main-color font-bold  flex justify-center font-arial-rounded">Encouraging Youth </h1>
                <div className='p-10'>
                At the heart of our mission is the desire to make healthy eating more accessible and appealing to young people. We understand the challenges that many youths face when it comes to making nutritious food choices, and we're committed to providing them with easy-to-follow recipes, practical tips, and engaging content that empowers them to embrace a healthier lifestyle with confidence.
                </div>
             </div>
              </div>
              <Footer/>
        </main>
    );

}

export default Aboutpage;