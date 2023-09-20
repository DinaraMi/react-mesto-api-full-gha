import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Input from './Input';
import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      setMessage('Необходимо заполнить все поля!');
      return;
    }
    onLogin(email, password);
  };
  const buttonLabelText = isLoading ? 'Вход' : 'Войти';
  return (
    <AuthForm
      title="Вход"
      name="login"
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
        value={values.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        className="popup__text popup__text_type_password"
        type="password"
        name="password"
        minlength="8"
        maxlength="20"
        placeholder="Пароль"
        required
        value={values.password}
        onChange={handleChange}
      />
    </AuthForm>
  );
}
export default Login;