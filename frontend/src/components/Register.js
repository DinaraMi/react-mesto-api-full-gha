import React, { useEffect, useState } from 'react';
import AuthForm from './AuthForm';
import Input from './Input';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register({ onRegister }) {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (location.pathname === "/sign-up") {
      setValues({
        email: '',
        password: '',
      });
    }
  }, [location.pathname, setValues]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = values;
    onRegister(email, password);
  };
  const buttonLabelText = isLoading ? 'Идет регистрация' : 'Зарегистрироваться';
  return (
    <>
      <AuthForm
        title="Регистрация"
        name="register"
        isLoading={isLoading}
        buttonLabel={buttonLabelText}
        onSubmit={handleSubmit}
      >
        <Input
          id="email"
          name="email"
          className="popup__text popup__text_type_email"
          type="email"
          placeholder="Email"
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <Input
          id="password"
          className="popup__text popup__text_type_password"
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          placeholder="Пароль"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
      </AuthForm>
      <Link className="register__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}
export default Register;