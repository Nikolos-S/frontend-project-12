import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../hooks';

const SignupPage = () => {
  console.log('>>>>>> SignPage');
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  const schema = yup.object().shape({
    username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('поле обязательно'),
    password: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('поле обязательно'),
    repeatPass: yup.string().required('поле обязательно').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPass: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        localStorage.setItem('userId', JSON.stringify(response.data));
        logIn(true);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  console.log(formik.touched.repeatPass);
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
                <h1 className="text-center mb-4">Регистрация</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="ваше имя"
                      name="username"
                      id="username"
                      autoComplete="off"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                    <Alert show={!!formik.errors.username} variant="danger">{formik.errors.username}</Alert>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      isInvalid={authFailed}
                      required
                    />
                    <Alert show={!!formik.errors.password} variant="danger">{formik.errors.password}</Alert>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.repeatPass}
                      placeholder="повторите пароль"
                      name="repeatPass"
                      id="repeatPass"
                      autoComplete="off"
                      isInvalid={authFailed}
                      required
                    />
                    <Alert show={!!formik.errors.repeatPass} variant="danger">{formik.errors.repeatPass}</Alert>
                    <Form.Control.Feedback type="invalid">Такой логин с паролем уже существуют, попробуйте снова</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className="w-100 wb-3" variant="outline-primary">Зарегистрироваться</Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  Есть акаунт?
                  <Link to="/login">Войти</Link>
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
/*
try {
        const response = await axios.post('/api/v1/signup', values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        logIn(true);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
*/
