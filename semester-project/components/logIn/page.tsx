'use client'
import React, { useEffect, useState } from 'react';
import LogInForm from '@/components/logInForm/page';
import SignUpForm from '@/components/signUpForm/page';
import { useAuth } from '@/app/AuthContext';
import DisplaySavedRecipes from '../displaySavedRecipes/page';
import Button from '../button/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import SearchBox from '../searchBox/page';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
      {isLoggedIn && <div className='flex justify-between mt-8'>
      <div className="ml-8"><SearchBox onSearch={handleSearch}/></div>
      <div className="flex justify-end">
          <FontAwesomeIcon icon={faUser} className="mt-2 text-custom-main-color text-2xl"/>
        <Button setClickedButton={handleLogout} name={"Logout"} path={''}></Button></div></div>}
      {isLoggedIn ? (
        <DisplaySavedRecipes />
      ) : (
        <main
          className="mt-[-100px] h-[101vh] flex justify-center items-center bg-cover"
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
