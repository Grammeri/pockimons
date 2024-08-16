import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { controlledFormSchema } from '../../validations/formSchemas';
import styles from './ControlledForm.module.scss';
import { ControlledFormData } from '../../interfaces/interfaces.ts';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(controlledFormSchema),
  });

  const onSubmit = (data: ControlledFormData) => {
    console.log('Controlled Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input id="name" {...register('name')} className={styles.input} />
        <p className={styles.error}>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="age" className={styles.label}>
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register('age')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.age?.message}</p>
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
