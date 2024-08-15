import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ControlledForm.module.scss'; // Импортируем стили как модуль

const schema = yup.object().shape({
  name: yup.string().required("Name is required").matches(/^[A-Z]/, "Name must start with an uppercase letter"),
  age: yup.number().required("Age is required").positive("Age must be a positive number").integer(),
  email: yup.string().required("Email is required").email("Email is not valid"),
});

const ControlledForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log("Controlled Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input id="name" {...register("name")} className={styles.input} />
        <p className={styles.error}>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="age" className={styles.label}>Age</label>
        <input id="age" type="number" {...register("age")} className={styles.input} />
        <p className={styles.error}>{errors.age?.message}</p>
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input id="email" type="email" {...register("email")} className={styles.input} />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default ControlledForm;
