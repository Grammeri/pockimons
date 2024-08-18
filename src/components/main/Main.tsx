import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const formData = useSelector((state: RootState) => state.formData.controlledForm);

  return (
    <div className={styles.mainContainer}>
      <h1>Main Page</h1>
      {formData ? (
        <div className={styles.formData}>
          <h2>Submitted Data</h2>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
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
        <p>No data submitted yet.</p>
      )}
    </div>
  );
};

export default Main;
