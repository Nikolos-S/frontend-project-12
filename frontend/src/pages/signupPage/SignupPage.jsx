import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/index.jsx';
import getToast from '../../toast/toast';
import routes from '../../routes.js';

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
    username: yup.string().min(3, 'limitName').max(20, 'limitName').required('required'),
    password: yup.string().min(6, 'limitPass').required('required'),
    repeatPass: yup.string().oneOf([yup.ref('password')], 'oneOf'),
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
        const response = await axios.post(
          routes.signupPath(),
          { username: values.username, password: values.password },
        );
        logIn(response.data);
        navigate(routes.layout());
      } catch (err) {
        inputRef.current.select();
        setSubmitting(false);
        if (err.message === 'Network Error') {
          console.log(err);
          getToast(t('toast.error'), 'error');
        }
        if (err.isAxiosError && err.response.status === 409) {
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
                <img src="./signupPage.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('form.registration')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="username" label={t('form.regName')} className="mb-3">
                      <Form.Control
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        autoComplete="off"
                        placeholder={t('form.regName')}
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
                        autoComplete="off"
                        placeholder={t('form.pass')}
                        isInvalid={
                          (formik.touched.password && formik.errors.password) || authFailed
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.password && t(`err.${formik.errors.password}`)}</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="repeatPass" label={t('form.repeatPass')} className="mb-3">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repeatPass}
                        name="repeatPass"
                        autoComplete="off"
                        placeholder={t('form.repeatPass')}
                        isInvalid={
                          (formik.touched.repeatPass && formik.errors.repeatPass) || authFailed
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.repeatPass ? t(`err.${formik.errors.repeatPass}`) : t('err.alreadyExists')}</Form.Control.Feedback>
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
                  <Link to={routes.layout()}>{t('form.enter')}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
