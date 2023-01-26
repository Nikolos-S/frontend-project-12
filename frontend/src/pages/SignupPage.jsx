import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import getToast from '../toast/toast';

const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    username: yup.string().min(3, t('err.limitName')).max(20, t('err.limitName')).required(t('err.required')),
    password: yup.string().min(6, t('err.limitPass')).required(t('err.required')),
    repeatPass: yup.string().oneOf([yup.ref('password')], t('err.oneOf')),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        repeatPass: '',
      }}
      validateOnBlur
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        setAuthFailed(false);
        try {
          const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
          localStorage.setItem('userId', JSON.stringify(response.data));
          logIn(true);
          navigate('/');
        } catch (err) {
          inputRef.current.select();
          setSubmitting(false);
          if (err.isAxiosError && err.response.status === 409) {
            setAuthFailed(true);
          } if (err.code === 'ERR_NETWORK') {
            console.log(err.code);
            getToast(t('toast.error'), 'error');
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
                    <img src="./signupPage.jpg" className="rounded-circle" alt="Войти" />
                  </div>
                  <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('form.registration')}</h1>
                    <fieldset disabled={isSubmitting}>
                      <Form.Group className="form-floating mb-3">
                        <FloatingLabel label={t('form.regName')} className="mb-3">
                          <Form.Control
                            className={touched.username && errors.username && 'is-invalid'}
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            name="username"
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
                            autoComplete="off"
                            isInvalid={(touched.password && errors.password) || authFailed}
                            required
                          />
                          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <FloatingLabel label={t('form.repeatPass')} className="mb-3">
                          <Form.Control
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repeatPass}
                            name="repeatPass"
                            autoComplete="off"
                            isInvalid={(touched.repeatPass && errors.repeatPass) || authFailed}
                            required
                          />
                          <Form.Control.Feedback type="invalid">{errors.repeatPass ? errors.repeatPass : t('err.alreadyExists')}</Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Button type="submit" className="w-100 wb-3" variant="outline-primary">{t('form.register')}</Button>
                    </fieldset>
                  </Form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>
                      {t('form.noAcc')}
                      <Link to="/login">{t('form.enter')}</Link>
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

export default SignupPage;
