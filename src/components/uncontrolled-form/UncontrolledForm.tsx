import React, { useRef } from 'react';
import styles from './UncontrolledForm.module.scss';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      name: nameRef.current?.value,
      age: nameRef.current?.value,
      email: nameRef.current?.value,
    };
    console.log("Uncontrolled Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input id="name" name="name" ref={nameRef} className={styles.input} />
      </div>
      <div>
        <label htmlFor="age" className={styles.label}>Age</label>
        <input id="age" name="age" type="number" ref={ageRef} className={styles.input} />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input id="email" name="email" type="email" ref={emailRef} className={styles.input} />
      </div>
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
