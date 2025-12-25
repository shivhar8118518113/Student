import 'bootstrap/dist/css/bootstrap.min.css';   // ✅ Bootstrap styles
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';    // ✅ Global reset styles
import './App.css';      // ✅ Custom UI styles
import App from './App.jsx';


// React root render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
