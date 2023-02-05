import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '../../context/index.jsx';
import getToast from '../../toast/toast';
import routes from '../../routes.js';

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
    username: yup.string().typeError('str'),
    password: yup.string().typeError('str'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPass: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        logIn(response.data);
        navigate(routes.layout());
      } catch (err) {
        inputRef.current.select();
        setSubmitting(false);
        if (err.message === 'Network Error') {
          getToast(t('toast.error'), 'error');
        }
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./loginForm.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('form.enter')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="username" label={t('form.name')} className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        placeholder={t('form.name')}
                        autoComplete="off"
                        isInvalid={
                          (formik.touched.username && formik.errors.username) || authFailed
                        }
                        required
                        ref={inputRef}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.username && t(`err.${formik.errors.username}`)}</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="password" label={t('form.pass')} className="mb-3">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        placeholder={t('form.pass')}
                        autoComplete="off"
                        isInvalid={
                          (formik.touched.password && formik.errors.password) || authFailed
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.password ? t(`err.${formik.errors.password}`) : t('err.invalid')}</Form.Control.Feedback>
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
                  <Link to={routes.signup()}>{t('form.registration')}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
