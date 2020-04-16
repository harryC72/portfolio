import React, { useRef, useEffect, useState, Fragment } from "react";
import { useInput } from "../../hooks/inputHook";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { connect } from "react-redux";
import { register } from "../../flux/actions/authActions";
import { clearErrors } from "../../flux/actions/errorActions";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
};

function Register({ classes, register, error, isAuthenticated, clearErrors }) {
  useEffect(() => {
    // Check for register error
    console.log("ERROR", error.id);
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error, isAuthenticated]);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const [msg, setMsg] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    console.log("NEW USER IN REGISTER", newUser);
    register(newUser);
    clearErrors();
    resetName();
    resetEmail();
    resetPassword();
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
      >
        <div>
          <TextField
            type="text"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="Name"
            {...bindName}
          />
        </div>
        <div>
          <TextField
            type="email"
            id="outlined-multiline-static"
            label="Email"
            variant="outlined"
            name="Email"
            {...bindEmail}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="Password"
            {...bindPassword}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default withStyles(styles)(
  connect(mapStateToProps, { register, clearErrors })(Register)
);
