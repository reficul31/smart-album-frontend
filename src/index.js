import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { SearchPage } from './pages/SearchPage/SearchPage';
import { UploadPage } from './pages/UploadPage/UploadPage';

import { store } from './app/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <div className="nav-panel">
                <div className="nav-inner-div">
                    <div className="nav-button">
                        <NavLink to="/">SEARCH</NavLink>
                    </div>
                    <div className="nav-button">
                        <NavLink to="/upload">UPLOAD</NavLink>
                    </div>
                </div>
            </div>
            <div className="main-panel">
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);