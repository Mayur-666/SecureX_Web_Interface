import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from './utils/firebase.js'; // Adjust the import based on your project structure
import { doc, setDoc } from 'firebase/firestore';


//context from context api
export const AppContext = createContext();

const AppProvider = ({ children }) => {

  // initial state for the app 
  const [state, setState] = useState({
    user: null,
    isAuth: false,
    error: null, 
    success: null, 
    token: null, 
    crimes: [],
    crimeError: null,
    crimeSuccess: null,
  });

  //auth from firebase
  const auth = getAuth();

  useEffect(() => {
    // Retrieve user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setState((prevState) => ({
        ...prevState,
        user: JSON.parse(storedUser),
        isAuth: true,
      }));
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState((prevState) => ({
          ...prevState,
          user,
          isAuth: true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
          isAuth: false,
        }));
      }
    });

    return unsubscribe;
  }, [auth]);

  //register function from firebase 
  const register = async (formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save additional user info to Firestore
      await setDoc(doc(db, 'police', user.uid), {
        email: formData.email,
        address: formData.address,
        location: formData.location,
      });

      setState((prevState) => ({
        ...prevState,
        user,
        isAuth: true,
        success: 'Registration successful',
      }));

      localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };


  const login = async (formData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      setState((prevState) => ({
        ...prevState,
        user,
        isAuth: true,
        success: 'Login successful',
      }));
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
      console.log(state)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setState((prevState) => ({
        ...prevState,
        user: null,
        isAuth: false,
        success: 'Logout successful',
      }));
      localStorage.removeItem('user');
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  const clearErrors = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
      success: null,
    }));
  };

  return (
    <AppContext.Provider value={{ state, setState, register, login, logout, clearErrors }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;