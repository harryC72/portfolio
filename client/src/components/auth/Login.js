import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core/';
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: '20px 0 20px 0',
    },
  },
};

const Login = ({ classes, login, location }) => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };
    try {
      await login(loginUser);
      location.state !== undefined
        ? history.push(location.state.from)
        : history.push('/');
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <Fragment>
      {msg ? (
        <Alert severity='error' onClose={() => setMsg(null)}>
          <AlertTitle>Error</AlertTitle>
          {msg}
        </Alert>
      ) : null}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
        method='post'
      >
        <input
          type='password'
          name='fake-password'
          autoComplete='new-password'
          tabIndex='-1'
          style={{
            opacity: 0,
            float: 'left',
            border: 'none',
            height: '0',
            width: '0',
          }}
        />

        <div>
          <TextField
            autoComplete='new-password'
            type='email'
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='Email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <TextField
            autoComplete='new-password'
            type='password'
            label='Password'
            variant='outlined'
            name='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <Button type='submit'>Login</Button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export const ConnectedLogin = withStyles(styles)(
  connect(mapStateToProps, { login })(Login)
);
