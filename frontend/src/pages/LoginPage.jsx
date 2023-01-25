import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '../hooks';
import getToast from '../toast/toast';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  const schema = yup.object().shape({
    username: yup.string().typeError(t('err.str')).required(t('err.required')),
    password: yup.string().typeError(t('err.str')).required(t('err.required')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validateOnBlur
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        setAuthFailed(false);
        try {
          const response = await axios.post('/api/v1/login', values);
          localStorage.setItem('userId', JSON.stringify(response.data));
          logIn(true);
          navigate('/');
        } catch (err) {
          setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            console.log(err.response);
          } else {
            getToast('Ошибка соединения', 'error');
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="./loginForm.jpg" className="rounded-circle" alt="Войти" />
                  </div>
                  <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('form.enter')}</h1>
                    <fieldset disabled={isSubmitting}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          name="username"
                          id="username"
                          placeholder={t('form.name')}
                          autoComplete="off"
                          isInvalid={authFailed}
                          required
                          ref={inputRef}
                        />
                        {touched.username && errors.username && <Alert show variant="danger">{errors.username}</Alert>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          name="password"
                          id="password"
                          placeholder={t('form.pass')}
                          autoComplete="off"
                          isInvalid={authFailed}
                          required
                        />
                        {touched.password && errors.password && <Alert show variant="danger">{errors.password}</Alert>}
                        <Form.Control.Feedback type="invalid">{t('err.invalid')}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 wb-3" variant="outline-primary">{t('form.enter')}</Button>
                    </fieldset>
                  </Form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>
                      {t('form.haveAcc')}
                      <Link to="/signup">{t('form.registration')}</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
