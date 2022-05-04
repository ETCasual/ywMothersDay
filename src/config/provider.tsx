import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return <FirebaseAppProvider firebaseConfig={firebaseConfig}>{children}</FirebaseAppProvider>;
};
