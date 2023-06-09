import { createRoot } from 'react-dom/client';

import './index.css';

import AuthContextProvider from './context/authContext';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
);
