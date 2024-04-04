import React from 'react'
import Footer from 'src/components/footer/footer'
import { NavBar } from 'src/components/nav-bar'

export const PageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};
