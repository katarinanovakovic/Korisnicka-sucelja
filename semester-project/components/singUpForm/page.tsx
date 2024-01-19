'use client'
import { createClient, Entry } from 'contentful-management';
import { useState } from 'react';

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
    } catch (error) {
      console.error('Error creating or publishing new entry:', error);
      throw error;
    }
  };


const SignUpForm: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [uniqueUserNameError, setUniqueUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState<string>('');
  
    const isPasswordValid = password.length < 6;
  
    const handleSubmit = async () => {
      try {
        setUniqueUserNameError(false); // Clear unique username error
        setPasswordError(''); // Clear password too short error
  
        if (isPasswordValid) {
          setPasswordError('Password is too short. Please use at least six characters.'); // Display message that password is too short
          return;
        }
  
        await addUser({ userName, password });
        setUserName('');
        setPassword('');
      } catch (error) {
        console.error('Error submitting comment:', error);
        setUniqueUserNameError(true);
      }
    };
  
    return (
      <main>
        {uniqueUserNameError && <div className="error message">The userName is already taken. Try another one.</div>}
        {passwordError && <div className="error message">{passwordError}</div>}
        <div className="login-page">
          <div className="login-container">
            <h1 className="login-heading">Sign Up</h1>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                className="username-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                className="password-input"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <button type="button" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </main>
    );
  };
  
  export default SignUpForm;
  