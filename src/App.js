import { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

import { AuthContext } from './context/authContext';

const App = () => {
  const authContext = useContext(AuthContext);

  if (authContext.isAuth) {
    return <Ingredients />;
  }

  return <Auth />;
};

export default App;
