import React from 'react';
import Header from '../../pages/Header';
import { Outlet } from 'react-router-dom';
import styles from './styles';

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={styles.layout}>
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;
