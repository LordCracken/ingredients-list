import { createContext, useState } from 'react';

export const AuthContext = createContext({ isAuth: false, login: () => {} });

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login: loginHandler }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
