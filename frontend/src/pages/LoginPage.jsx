import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '../hooks';
import getToast from '../toast/toast';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    username: yup.string().typeError(t('err.str')),
    password: yup.string().typeError(t('err.str')),
  });

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
          inputRef.current.select();
          setSubmitting(false);
          if (err.message === 'Network Error') {
            console.log(err);
            getToast(t('toast.error'), 'error');
          }
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
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
                        <FloatingLabel label={t('form.name')} className="mb-3">
                          <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            name="username"
                            id="username"
                            autoComplete="off"
                            isInvalid={(touched.username && errors.username) || authFailed}
                            required
                            ref={inputRef}
                          />
                          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <FloatingLabel label={t('form.pass')} className="mb-3">
                          <Form.Control
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            id="password"
                            autoComplete="off"
                            isInvalid={(touched.password && errors.password) || authFailed}
                            required
                          />
                          <Form.Control.Feedback type="invalid">{errors.password ? errors.password : t('err.invalid')}</Form.Control.Feedback>
                        </FloatingLabel>
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
