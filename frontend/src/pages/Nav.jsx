import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth } from '../hooks';

const Header = () => {
  const { logOut } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        <div className="d-flex">
          {localStorage.getItem('userId') && <Button type="button" onClick={logOut} className="btn btn-primary">{t('nav.logout')}</Button>}
          <DropdownButton title={t('nav.lng')}>
            <Dropdown.Item onClick={() => changeLanguage('ru')}>RU</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </nav>
  );
};
export default Header;
