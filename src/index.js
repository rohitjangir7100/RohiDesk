import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ServiceDeskApp';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
  </>
);
