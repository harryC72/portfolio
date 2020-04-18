import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthBar from "./components/AuthBar";
import { StylesProvider } from "@material-ui/core/styles";
import { loadUser } from "./flux/actions/authActions";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

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
