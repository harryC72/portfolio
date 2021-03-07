import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AuthBar from './components/AuthBar';
import { StylesProvider } from '@material-ui/core/styles';
import { loadUser } from './flux/actions/authActions';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';

library.add(fab);

function App({ loadUser, isAuthenticated }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className='App'>
      <StylesProvider injectFirst>
        <Navbar auth={isAuthenticated} />
        <Footer>
          <AuthBar />
        </Footer>
      </StylesProvider>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(App);
