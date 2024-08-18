import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const controlledFormData = useSelector((state: RootState) => state.formData.controlledForm);
  const uncontrolledFormData = useSelector((state: RootState) => state.formData.uncontrolledForm);

  return (
    <div className={styles.mainContainer}>
      <h1>Main Page</h1>

      {controlledFormData ? (
        <div className={styles.formData}>
          <h2>Controlled Form Data</h2>
          <ul>
            {Object.entries(controlledFormData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                  typeof value === 'string' && value.startsWith('data:image') ? (
                    <img src={value} alt="Uploaded" width="100" />
                  ) : value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No controlled form data submitted yet.</p>
      )}

      {uncontrolledFormData ? (
        <div className={styles.formData}>
          <h2>Uncontrolled Form Data</h2>
          <ul>
            {Object.entries(uncontrolledFormData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                  typeof value === 'string' && value.startsWith('data:image') ? (
                    <img src={value} alt="Uploaded" width="100" />
                  ) : value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No uncontrolled form data submitted yet.</p>
      )}
    </div>
  );
};

export default Main;
