import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const controlledFormData = useSelector(
    (state: RootState) => state.formData.controlledForm
  );
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.formData.uncontrolledForm
  );
  const [highlightedForm, setHighlightedForm] = useState<string | null>(null);

  useEffect(() => {
    if (controlledFormData && !uncontrolledFormData) {
      setHighlightedForm('controlled');
    } else if (uncontrolledFormData && !controlledFormData) {
      setHighlightedForm('uncontrolled');
    } else if (controlledFormData && uncontrolledFormData) {
      const controlledTimestamp = new Date(
        controlledFormData.timestamp
      ).getTime();
      const uncontrolledTimestamp = new Date(
        uncontrolledFormData.timestamp
      ).getTime();

      if (controlledTimestamp > uncontrolledTimestamp) {
        setHighlightedForm('controlled');
      } else {
        setHighlightedForm('uncontrolled');
      }
    }

    const timer = setTimeout(() => {
      setHighlightedForm(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [controlledFormData, uncontrolledFormData]);

  return (
    <div className={styles.mainContainer}>
      <h1>Main Page</h1>

      {controlledFormData ? (
        <div
          className={`${styles.formData} ${highlightedForm === 'controlled' ? styles.highlight : ''}`}
        >
          <h2>Controlled Form Data</h2>
          <p><strong>Submitted at:</strong> {new Date(controlledFormData.timestamp).toLocaleString()}</p>
          <ul>
            {Object.entries(controlledFormData).map(([key, value]) => (
              key !== 'timestamp' && (
                <li key={key}>
                  <strong>{key}:</strong>
                  {typeof value === 'boolean' ? (
                    value ? (
                      'Yes'
                    ) : (
                      'No'
                    )
                  ) : typeof value === 'string' &&
                  value.startsWith('data:image') ? (
                      <img src={value} alt="Uploaded" width="100" />
                    ) : (
                      value
                    )}
                </li>
              )
            ))}
          </ul>
        </div>
      ) : (
        <p>No controlled form data submitted yet.</p>
      )}

      {uncontrolledFormData ? (
        <div
          className={`${styles.formData} ${highlightedForm === 'uncontrolled' ? styles.highlight : ''}`}
        >
          <h2>Uncontrolled Form Data</h2>
          <p><strong>Submitted at:</strong> {new Date(uncontrolledFormData.timestamp).toLocaleString()}</p>
          <ul>
            {Object.entries(uncontrolledFormData).map(([key, value]) => (
              key !== 'timestamp' && (
                <li key={key}>
                  <strong>{key}:</strong>
                  {typeof value === 'boolean' ? (
                    value ? (
                      'Yes'
                    ) : (
                      'No'
                    )
                  ) : typeof value === 'string' &&
                  value.startsWith('data:image') ? (
                      <img src={value} alt="Uploaded" width="100" />
                    ) : (
                      value
                    )}
                </li>
              )
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
