'use client'
import { createClient, Entry } from 'contentful-management';
import { useState } from 'react';
import "../logInForm/logInPage.css";
import Button from '../button/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

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

interface SignUpFormProps {
    toggleSignUp: () => void;
  }
  
  const SignUpForm: React.FC<SignUpFormProps> = ({ toggleSignUp }) => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [uniqueUserNameError, setUniqueUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [showErrorMessages, setShowErrorMessages] = useState(true);
  
    const isPasswordValid = password.length < 6;
  
    const handleCloseErrorMessages = () => {
      setShowErrorMessages(false);
    };
  
    const handleSubmit = async () => {
      try {
        setUniqueUserNameError(false);
        setPasswordError('');
  
        if (isPasswordValid) {
          setPasswordError('Password is too short. Please use at least six characters.');
          setShowErrorMessages(true); // Show error messages again on new submission attempt
          return;
        }
  
        await addUser({ userName, password });
        setUserName('');
        setPassword('');
        setShowErrorMessages(true); // Reset the error messages visibility on successful submission
      } catch (error) {
        console.error('Error submitting comment:', error);
        setUniqueUserNameError(true);
        setShowErrorMessages(true); // Reset the error messages visibility on submission error
      }
    };
  
    return (
      <main>
        <div className="login-page">
          <div className="login-container">
            {showErrorMessages && uniqueUserNameError && (
              <div className="error message">
                The Username is already taken. Try another one.
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCloseErrorMessages} />
              </div>
            )}
            {showErrorMessages && passwordError && (
              <div className="error message">
                {passwordError}
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCloseErrorMessages} />
              </div>
            )}
            <h1 className="login-heading">Sign Up</h1>
            <div className="input-container">
            <div className="icon-container">
              <FontAwesomeIcon icon={faUser} />
            </div>
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
              <div className="icon-container">
              <FontAwesomeIcon icon={faLock} />
            </div>
            </div>
  
            <div className="submit-button"><Button setClickedButton={handleSubmit} name={"Sign Up"} path={''}></Button></div>
            <button onClick={toggleSignUp}>Already have an account? Sign up here!</button>
          </div>
        </div>
      </main>
    );
  };
  
  export default SignUpForm;
  