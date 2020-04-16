import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthBar from "./components/AuthBar";
import { StylesProvider } from "@material-ui/core/styles";
import { loadUser } from "./flux/actions/authActions";
import { connect } from "react-redux";

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <Navbar />
        <AuthBar />
      </StylesProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.blogPost,
});

export default connect(mapStateToProps, { loadUser })(App);
