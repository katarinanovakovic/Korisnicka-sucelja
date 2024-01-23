'use client'
import { useAuth } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./logInPage.css";
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
        console.log('invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
         <div className="login-container">
            <h1 className="login-heading">Log In</h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="icon-container">
              <FontAwesomeIcon icon={faLock} />
            </div>
            </div>

            <div className="submit-button"><Button setClickedButton={handleSubmit} name={"Log In"} path={""}></Button></div>
            <button onClick={toggleSignUp}>Don&apos;t have an account? Sign up here!</button>
          </div>
  );
};

export default LogInForm;
