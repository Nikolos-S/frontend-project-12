import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div id="error-page" className="text-center">
      <img alt={t('404.notFound')} className="img-fluid w-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
      <h1 className="h4 text-muted">{t('404.notFound')}</h1>
      <p className="text-muted">
        {t('404.goOver')}
        <Link to="/">{t('404.mainPage')}</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
