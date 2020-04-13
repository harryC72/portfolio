import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import { StylesProvider } from "@material-ui/core/styles";
import { loadUser } from "./flux/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch.loadUser();
  }, []);
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <Navbar />
      </StylesProvider>
    </div>
  );
}

export default App;
