import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routers from './routes';

export default function App() {
  return (
    <Router>
      <Routes>
        {routers.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  );
}
