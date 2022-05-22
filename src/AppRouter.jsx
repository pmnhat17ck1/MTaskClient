import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import axiosDebugger from './utils/apis/axiosDebugger';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import PrivateRoute from './commons/PrivateRoute';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import ResetPassword from './pages/ResetPassword';

import Page404 from './pages/Page404';


const AppRouter = () => {
  axiosDebugger();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    axios.defaults.headers.common.Authorization = `Token ${reactLocalStorage.get(
      'token'
    )}`;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route
          path="/forgot-password/verification"
          exact
          element={<Verification />}
        />
        <Route
          path="/forgot-password/reset-password"
          exact
          element={<ResetPassword />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/change-password" exact element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
