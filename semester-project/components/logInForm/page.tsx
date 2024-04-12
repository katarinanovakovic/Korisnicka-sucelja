'use client'
import { useAuth } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faExclamationCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/page";

interface UserFields {
  userName: string;
  password: string;
}

interface User {
  sys: {
    id: string;
  };
  fields: UserFields;
}

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'c2epmrmqiqap',
  accessToken: 'SsS4a0T3sfF4NpTF4xhqPGL1OHjwgiN2f72YHtTbL8s',
});

interface LogInFormProps {
  toggleSignUp: () => void;
}

const LogInForm: React.FC<LogInFormProps> = ({ toggleSignUp }) => {
  const [entries, setEntries] = useState<User[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();
  const [showErrorMessages, setShowErrorMessages] = useState('');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('username', String(username));
  }, [isLoggedIn, username]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'user',
        }) as { items: User[] };

        setEntries(response.items);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const userEntry = entries.find(entry => entry.fields.userName === userName && entry.fields.password === password);

      if (userEntry) {
        setLoggedIn(true);
        setUsername(userEntry.sys.id);

      } else {
        setShowErrorMessages('Invalid username or password. Try again!');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to clear error message when user starts typing again
  const handleInputChange = () => {
    setShowErrorMessages('');
  };

  return (
    <div className="w-[400px] absolute top-1/2 right-20 transform -translate-y-1/2 bg-gray-200 bg-opacity-90 p-10 text-center rounded-[40px]">
      <h1 className="text-custom-main-color text-5xl mb-5">Log In</h1>
      <div className="flex align-center">
        <div className="text-4xl text-custom-main-color mr-5 mt-5">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <input
          type="text"
          placeholder="Username"
          className="w-full h-[40px] p-5 font-normal box-border mb-5 mt-5 border border-gray-300 rounded-full"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            handleInputChange(); // Clear error message on input change
          }}
          required
        />
      </div>
      <div className="flex align-center">
        <input
          type="password"
          placeholder="Password"
          className="w-full h-[40px] p-5 font-normal box-border mb-5 mt-5 border border-gray-300 rounded-full"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange(); // Clear error message on input change
          }}
          required
        />
        <div className="text-4xl text-custom-main-color ml-5 mt-5">
          <FontAwesomeIcon icon={faLock} />
        </div>
      </div>
      {showErrorMessages && <div className="text-red-500 text-lg"><FontAwesomeIcon icon={faExclamationCircle} className="cursor-pointer text-red-500 text- mr-5" />{showErrorMessages}</div>}
      <div className="m-10"><Button setClickedButton={handleSubmit} name={"Log In"} path={""}></Button></div>
      <button onClick={toggleSignUp}>Don&apos;t have an account? Sign up here!</button>
    </div>
  );
};

export default LogInForm;
