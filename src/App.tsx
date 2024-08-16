import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import UncontrolledForm from './components/uncontrolled-form/UncontrolledForm.tsx';
import ControlledForm from './components/controlled-form/ControlledForm.tsx';
import styles from './App.module.scss';

const App = () => {
  return (
    <Router>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Main</NavLink>
        <NavLink to="/form-uncontrolled" className={({ isActive }) => (isActive ? styles.active : '')}>Uncontrolled Form</NavLink>
        <NavLink to="/form-controlled" className={({ isActive }) => (isActive ? styles.active : '')}>Controlled Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<div className={styles.mainPage}>Main Page</div>} />
        <Route path="/form-uncontrolled" element={<UncontrolledForm />} />
        <Route path="/form-controlled" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
};

export default App;
