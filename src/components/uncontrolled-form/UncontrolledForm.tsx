import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUncontrolledFormData } from '../../store/slices/formDataSlice';
import styles from '../controlled-form/ControlledForm.module.scss';
import { RootState } from '../../store/store';
import { FormData } from '../../interfaces/interfaces.ts';
import { controlledFormSchema } from '../../validations/formSchemas';
import * as yup from 'yup';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const acceptTermsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files || null,
      country: countryRef.current?.value || '',
    };

    const validationErrorsObj: { [key: string]: string } = {};

    if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(formData.password)) {
      validationErrorsObj.password =
        'Password can only contain Latin letters, numbers, and special characters';
    }

    try {
      await controlledFormSchema.validate(formData, { abortEarly: false });
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach(error => {
          if (error.path && !validationErrorsObj[error.path]) {
            validationErrorsObj[error.path] = error.message;
          }
        });
      }
    }

    if (Object.keys(validationErrorsObj).length > 0) {
      setErrors(validationErrorsObj);
      return;
    } else {
      setErrors({});
    }

    const timestamp = new Date().toISOString();

    if (formData.picture && formData.picture.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formData.picture = reader.result as string;
        dispatch(saveUncontrolledFormData({ ...formData, timestamp }));
        navigate('/');
      };
      reader.readAsDataURL(formData.picture[0]);
    } else {
      dispatch(saveUncontrolledFormData({ ...formData, timestamp }));
      navigate('/');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Uncontrolled Form</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" name="name" type="text" />
          {errors.name && nameRef.current?.value && (
            <p className={styles.errorText}>{errors.name}</p>
          )}
          {!nameRef.current?.value && isSubmitted && <p>Name is required</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input ref={ageRef} id="age" name="age" type="number" />
          {errors.age && ageRef.current?.value && (
            <p className={styles.errorText}>{errors.age}</p>
          )}
          {!ageRef.current?.value && isSubmitted && <p>Age is required</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" name="email" type="email" />
          {errors.email && emailRef.current?.value && (
            <p className={styles.errorText}>{errors.email}</p>
          )}
          {!emailRef.current?.value && isSubmitted && <p>Email is required</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
          />
          {errors.password && passwordRef.current?.value && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
          {!passwordRef.current?.value && isSubmitted && (
            <p>Password is required</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
          {errors.confirmPassword && confirmPasswordRef.current?.value && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
          {!confirmPasswordRef.current?.value && isSubmitted && (
            <p>Please confirm password</p>
          )}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select ref={genderRef} id="gender" name="gender">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && genderRef.current?.value && (
            <p className={styles.errorText}>{errors.gender}</p>
          )}
          {!genderRef.current?.value && isSubmitted && <p>Required</p>}
        </div>
        <div>
          <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
          <input
            ref={acceptTermsRef}
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
          />
          {errors.acceptTerms && acceptTermsRef.current?.checked && (
            <p className={styles.errorText}>{errors.acceptTerms}</p>
          )}
          {!acceptTermsRef.current?.checked && isSubmitted && <p>Required</p>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture</label>
          <input ref={pictureRef} id="picture" name="picture" type="file" />
          {errors.picture && pictureRef.current?.value && (
            <p className={styles.errorText}>{errors.picture}</p>
          )}
          {!pictureRef.current?.value && isSubmitted && <p>Required</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            ref={countryRef}
            id="country"
            name="country"
            list="countries"
          />
          <datalist id="countries">
            {countries.map(country => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && countryRef.current?.value && (
            <p className={styles.errorText}>{errors.country}</p>
          )}
          {!countryRef.current?.value && isSubmitted && <p>Required</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
