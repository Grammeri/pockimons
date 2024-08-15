import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UncontrolledForm from './components/uncontrolled-form/UncontrolledForm.tsx';
import ControlledForm from './components/controlled-form/ControlledForm.tsx';


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
        <Route path="/form-uncontrolled" element={<UncontrolledForm />} />
        <Route path="/form-controlled" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
};

export default App;
