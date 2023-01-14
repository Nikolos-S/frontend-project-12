import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
// import * as yup from 'yup';
import useAuth from '../hooks';

/*
Для вывода ошибок:
import { ToastContainer } from 'react-toastify';
<ToastContainer />
 <Button disabled={!isValid && !dirty}
 className="w-100 wb-3" variant="outline-primary" type="submit">Войти</Button>
*/

const LoginPage = () => {
  const { setLoggedIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        setLoggedIn(response);
        navigate('/');
        console.log(response);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          console.log(err.message);
          return;
        }
        throw err;
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
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="ваше имя"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className="w-100 wb-3" variant="outline-primary">Войти</Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  Нет акаунта?
                  <Link to="/signup">Регистрация</Link>
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

/*
const schema = yup.object().shape({
    username: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
  });
*/
