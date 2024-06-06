// src/context/AppContext.js

import React, { createContext, useContext, useState } from 'react';
import { THEMES } from '../constants/music/themes.ts';
// Initial state
const initialState = {
  appState: {
    toastMsg: {
      title: '',
      message: '',
      delay: 0,
      isError: false,
      show: false
    },
    theme: THEMES[0]
  },
  setAppState: () => { }
}

const AppContext = createContext(initialState);


// Provider component
export const AppProvider = ({ children }) => {

  const initialState = {
      toastMsg: {
        title: '',
        message: '',
        delay: 0,
        isError: false,
        show: false
      },
      theme: THEMES[0]
  }

  const [appState, setAppStateInternal] = useState(initialState);

  const setAppState = (newAppState) => setAppStateInternal(prevAppState => ({
    ...prevAppState,
    ...newAppState
  }))
  return (
    <AppContext.Provider value={{appState,setAppState}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

