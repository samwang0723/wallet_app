import { AppState } from '@/store/types';
import React from 'react';

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Create the context with a default value of `undefined`
export const AppContext = React.createContext<AppContextProps | undefined>(undefined);

// Usage
// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';
//
// const ProfileScreen: React.FC = () => {
//   const appContext = useContext(AppContext);
//
//   if (!appContext) {
//     throw new Error('AppContext is undefined. Make sure you are using the AppProvider.');
//   }
//
//   const { state, setState } = appContext;
//
//   const handleLogout = () => {
//     setState((prevState) => ({
//       ...prevState,
//       user: null,
//       isAuthenticated: false,
//     }));
//   };
//   ...
