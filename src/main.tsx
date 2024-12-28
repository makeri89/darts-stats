import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DartProvider } from './context/DartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DartProvider>
      <App />
    </DartProvider>
  </React.StrictMode>
);
