import React, { useState, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../flux/actions/authActions";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
};

function Register({ classes, register }) {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    console.log("NEW USER IN REGISTER", newUser);
    register(newUser)
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        history.push("/login");
      })
      .catch((err) => {
        setMsg(err);
      });
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="email"
            id="outlined-multiline-static"
            label="Email"
            variant="outlined"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withStyles(styles)(
  connect(mapStateToProps, { register })(Register)
);
