import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { saveControlledFormData } from '../../store/slices/formDataSlice';
import { RootState } from '../../store/store';
import { controlledFormSchema } from '../../validations/formSchemas';
import styles from './ControlledForm.module.scss';
import { FormData } from '../../interfaces/interfaces.ts';

const ControlledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
    setValue,
  } = useForm({
    resolver: yupResolver(controlledFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      picture: undefined,
      country: '',
    },
  });

  const onSubmit = (data: FormData) => {
    const timestamp = new Date().toISOString();

    if (data.picture && data.picture.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const formDataWithBase64Picture = {
          ...data,
          picture: reader.result as string,
          timestamp,
        };
        dispatch(saveControlledFormData(formDataWithBase64Picture));
        navigate('/');
      };
      reader.readAsDataURL(data.picture[0]);
    } else {
      dispatch(saveControlledFormData({ ...data, timestamp }));
      navigate('/');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Controlled Form</h1>

        <div>
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && touchedFields.name && <p>{errors.name.message}</p>}
          {!touchedFields.name && isSubmitted && <p>Name is required</p>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.age && touchedFields.age && <p>{errors.age.message}</p>}
          {!touchedFields.age && isSubmitted && <p>Age is required</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
          />
          {errors.email && touchedFields.email && <p>{errors.email.message}</p>}
          {!touchedFields.email && isSubmitted && <p>Email is required</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.password && touchedFields.password && (
            <p>{errors.password.message}</p>
          )}
          {!touchedFields.password && isSubmitted && (
            <p>Password is required</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
          )}
          {!touchedFields.confirmPassword && isSubmitted && (
            <p>Please confirm password</p>
          )}
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors.gender && touchedFields.gender && (
            <p>{errors.gender.message}</p>
          )}
          {!touchedFields.gender && isSubmitted && <p>Required</p>}
        </div>

        <div>
          <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                {...field}
                checked={field.value || false}
                onChange={e => field.onChange(e.target.checked)}
              />
            )}
          />
          {errors.acceptTerms && touchedFields.acceptTerms && (
            <p>{errors.acceptTerms.message}</p>
          )}
          {!touchedFields.acceptTerms && isSubmitted && <p>Required</p>}
        </div>

        <div>
          <label htmlFor="picture">Upload Picture</label>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setValue('picture', e.target.files);
                    field.onChange(e.target.files);
                  }
                }}
              />
            )}
          />
          {errors.picture && touchedFields.picture && (
            <p>{errors.picture.message}</p>
          )}
          {!touchedFields.picture && isSubmitted && <p>Required</p>}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => <input list="countries" {...field} />}
          />
          <datalist id="countries">
            {countries.map(country => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && touchedFields.country && (
            <p>{errors.country.message}</p>
          )}
          {!touchedFields.country && isSubmitted && <p>Required</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ControlledForm;
