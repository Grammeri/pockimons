import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Main</Link>
        <Link to="/form-uncontrolled">Uncontrolled Form</Link>
        <Link to="/form-controlled">Controlled Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Main Page</div>} />
        <Route path="/form-uncontrolled" element={<div>Uncontrolled Form Page</div>} />
        <Route path="/form-controlled" element={<div>Controlled Form Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
