import React, { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { StatusMessage } from '@/types';
import AuthenticationService from '@/service/AuthService';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
  const [captcha, setCaptcha] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setStatusMessage([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name || name.trim() === '') {
      setNameError(t('error.username.required'));
      result = false;
    }

    if (!password || password.trim() === '') {
      setPasswordError(t('error.password.required'));
      result = false;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      setConfirmPasswordError(t('error.confirm.password.required'));
      result = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t('error.password.not.match'));
      result = false;
    }

    if (!captcha) {
      setStatusMessage([{ message: t('error.captcha.required'), type: 'error' }]);
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { name, password, captcha };
    console.log(user);
    const response = await AuthenticationService.Register(user);

    if (response.status === 200) {
      setStatusMessage([{ message: `${t('register.success')}`, type: 'success' }]);
      router.push('/login');
    } else {
      setStatusMessage([{ message: `${t('register.error')}`, type: 'error' }]);
      console.log('Error:', response.status);
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptcha(value ?? '');
  };

  return (
    <div className="w-1/3 mx-auto mt-8 bg-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-4">{t('register.title')}</h1>
      {statusMessage && (
        <div className="w-1/3 mx-auto">
          <ul className="list-none mb-3 mx-auto">
            {statusMessage.map(({ message, type }, index) => (
              <li
                key={message}
                className={classNames({
                  'text-green-800': type === 'success',
                  'text-red-800': type === 'error',
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('register.name')}
          />
        </div>
        {nameError && <div className="text-red-800">{nameError}</div>}
        <div>
          <input
            className="w-full p-2 border rounded"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('register.password')}
          />
        </div>
        {passwordError && <div className="text-red-800">{passwordError}</div>}
        <div>
          <input
            className="w-full p-2 border rounded"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder={t('register.confirm.password')}
          />
        </div>
        {confirmPasswordError && <div className="text-red-800">{confirmPasswordError}</div>}
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey={'6LcnjPIqAAAAAOVTwl45oqlhkWKEYWbjIndXftsA'}
            onChange={onCaptchaChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {t('register.submit')}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
