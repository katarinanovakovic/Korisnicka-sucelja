'use client'
import React, { useEffect, useState } from 'react';
import LogInForm from '@/components/logInForm/page';
import SignUpForm from '@/components/signUpForm/page';
import { useAuth } from '@/app/AuthContext';
import DisplaySavedRecipes from '../displaySavedRecipes/page';
import Button from '../button/page';

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

const LogIn: React.FC = () => {
  const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [image, setImage] = useState<Image[]>([]);

  function handleLogout() {
    setLoggedIn(false);
    setUsername(null);
  }

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

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
    <div>
      {isLoggedIn && <Button setClickedButton={handleLogout} name={"Logout"} path={''}></Button>}
      {isLoggedIn ? (
        <DisplaySavedRecipes />
      ) : (
        <main
          className="main"
          style={{
            backgroundImage: `url(${
              image.length > 0 && image[2].fields.image?.fields?.file?.url
            })`,
          }}
        >
        {showSignUp ? (<SignUpForm toggleSignUp={toggleSignUp}/>) : (<LogInForm toggleSignUp={toggleSignUp} />)}
        </main>
      )}
    </div>
  );
};

export default LogIn;
