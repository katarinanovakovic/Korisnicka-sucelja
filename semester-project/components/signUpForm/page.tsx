'use client'
import { createClient, Entry } from 'contentful-management';
import { useState } from 'react';
import Button from '../button/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faExclamationCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext';

interface UserFields {
  userName: string;
  password: string;
}

// Extend Entry interface to include publish method
interface CustomUser extends Entry, UserFields {}

const addUser = async (newEntryData: UserFields) => {
    try {
      const client = createClient({
        accessToken: 'CFPAT-4W6YBvnHoi1ct3BxnnCqiFbWUX1KoRysY5B2rNoOoNE',
      });
      
      const spaceId = 'c2epmrmqiqap';
      const environmentId = 'master';
      const contentTypeId = 'user';
  
      // Create a new entry with provided data
      const createdUser = (await (await (await client
        .getSpace(spaceId))
        .getEnvironment(environmentId))
        .createEntry(contentTypeId, {
          fields: {
            userName: { 'en-US': newEntryData.userName },
            password: { 'en-US': newEntryData.password },
          },
        })) as unknown as CustomUser;
  
      // Publish the created entry
      await createdUser.publish();

      console.log('New entry created and published:', createdUser);

      return createdUser.sys.id;
    } catch (error) {
      console.error('Error creating or publishing new entry:', error);
      throw error;
    }
  };

interface SignUpFormProps {
    toggleSignUp: () => void;
  }
  
  const SignUpForm: React.FC<SignUpFormProps> = ({ toggleSignUp }) => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [uniqueUserNameError, setUniqueUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [showErrorMessages, setShowErrorMessages] = useState(true);
    const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();
  
    const isPasswordValid = password.length < 6;
  

    const handleSubmit = async () => {
      try {
        setUniqueUserNameError(false);
        setPasswordError('');
  
        if (isPasswordValid) {
          setPasswordError('Password is too short. Please use at least six characters.');
          setShowErrorMessages(true); 
          return;
        }
  
        const createdUsername = await addUser({ userName, password });
        setUserName('');
        setPassword('');
        setShowErrorMessages(true); 
        setLoggedIn(true);
        setUsername(createdUsername);
      } catch (error) {
        console.error('Error submitting comment:', error);
        setUniqueUserNameError(true);
        setShowErrorMessages(true); 
      }
    };
  
    return (
      <main>
          <div className="w-[400px] absolute top-1/2 right-20 transform -translate-y-1/2 bg-gray-200 bg-opacity-90 p-10 text-center rounded-[40px]">
            <h1 className="text-custom-main-color text-5xl mb-5 font-arial-rounded">Sign Up</h1>
            <div className="flex align-center">
            <div className="text-4xl text-custom-main-color mr-5 mt-5">
              <FontAwesomeIcon icon={faUser} />
            </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full h-[40px] p-5 font-normal box-border mb-5 mt-5 border border-gray-300 rounded-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            {showErrorMessages && uniqueUserNameError && (
              <div className="text-red-500 text-lg">
                <FontAwesomeIcon icon={faExclamationCircle} className="cursor-pointer text-red-500 text- mr-5" />
                The Username is already taken. Try another one.
                
              </div>
            )}
            <div className="flex align-center">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-[40px] p-5 font-normal box-border mb-5 mt-5 border border-gray-300 rounded-full"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-4xl text-custom-main-color ml-5 mt-5">
              <FontAwesomeIcon icon={faLock} />
            </div>
            </div>
            {showErrorMessages && passwordError && (
              <div className="text-red-500 text-lg">
                <FontAwesomeIcon icon={faExclamationCircle} className="cursor-pointer text-red-500 text- mr-5" />
                {passwordError}
              </div>
            )}
  
            <div className="m-10"><Button setClickedButton={handleSubmit} name={"Sign Up"} path={''}></Button></div>
            <button onClick={toggleSignUp}>Already have an account? Sign up here!</button>
          </div>
      </main>
    );
  };
  
  export default SignUpForm;
  