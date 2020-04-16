import React, { Fragment, useEffect, useState } from "react";
import { useInput } from "../../hooks/inputHook";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { TextField, Button } from "@material-ui/core/";
import { connect } from "react-redux";
import { login } from "../../flux/actions/authActions";
import { clearErrors } from "../../flux/actions/errorActions";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
};

const Login = ({ isAuthenticated, error, classes, login, errStatus }) => {
  let history = useHistory();
  useEffect(() => {
    // Check for register error
    console.log("ERROR", error.id);
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [errStatus, error, isAuthenticated]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };
    login(loginUser);
    history.push("/");

    clearErrors();
  };

  return (
    <Fragment>
      {msg ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {msg}
        </Alert>
      ) : null}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        method="post"
      >
        <input
          type="password"
          name="fake-password"
          autoComplete="new-password"
          tabIndex="-1"
          style={{
            opacity: 0,
            float: "left",
            border: "none",
            height: "0",
            width: "0",
          }}
        />

        <div>
          <TextField
            autoComplete="new-password"
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <TextField
            autoComplete="new-password"
            type="password"
            label="Password"
            variant="outlined"
            name="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  errStatus: state.error.status,
});

export const ConnectedLogin = withStyles(styles)(
  connect(mapStateToProps, { login, clearErrors })(Login)
);
