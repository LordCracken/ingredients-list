import { useContext } from 'react';

import { AuthContext } from '../context/authContext';
import Card from './UI/Card';
import './Auth.css';

const Auth = () => {
  const { login } = useContext(AuthContext);

  const loginHandler = () => {
    login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
