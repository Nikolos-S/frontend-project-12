import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth } from '../context/index.jsx';
import routes from '../routes.js';

const Layout = () => {
  const { logOut, loggedId } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={routes.layout()}>{t('nav.name')}</Link>
          <div className="d-flex">
            {loggedId && <Button type="button" onClick={logOut} className="btn btn-primary">{t('nav.logout')}</Button>}
            <DropdownButton title={t('nav.lng')}>
              <Dropdown.Item onClick={() => changeLanguage('ru')}>{t('nav.ru')}</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('en')}>{t('nav.en')}</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Layout;
