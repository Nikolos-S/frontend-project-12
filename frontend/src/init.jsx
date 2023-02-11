import React from 'react';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import i18n from './locales/i18n';
import App from './App.jsx';
import SocketProvider from './context/socketContexts/SocketProvider.jsx';
import AuthProvider from './context/AuthProvider.jsx';

const RunApp = ({ socket }) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <ErrorProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <SocketProvider socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </ErrorProvider>
  );
};

export default RunApp;
