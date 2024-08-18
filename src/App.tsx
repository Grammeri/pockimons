import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import ControlledForm from './components/controlled-form/ControlledForm';
import Main from './components/main/Main';
import styles from './App.module.scss';
import UncontrolledForm from './components/uncontrolled-form/UncontrolledForm';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
        Main
      </Link>
      <Link
        to="/form-uncontrolled"
        className={
          location.pathname === '/form-uncontrolled' ? styles.active : ''
        }
      >
        Uncontrolled Form
      </Link>
      <Link
        to="/form-controlled"
        className={
          location.pathname === '/form-controlled' ? styles.active : ''
        }
      >
        Controlled Form
      </Link>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form-uncontrolled" element={<UncontrolledForm />} />
        <Route path="/form-controlled" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
};

export default App;
