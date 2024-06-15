import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
