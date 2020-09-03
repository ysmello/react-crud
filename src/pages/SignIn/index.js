import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TextField, Button } from '@material-ui/core';

import * as AuthActions from '../../store/actions/auth';

import { Container, Content, Form } from './styles';

const SignIn = ({ getAuthUser }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    const userValues = {
      userEmail: values.email,
      userPassword: values.password
    };

    await getAuthUser(userValues);

    history.push('/dashboard');
  };

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;

      setValues(state => ({ ...state, [name]: value }));
    },
    [setValues]
  );

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <TextField
            id='email'
            name='email'
            label='E-mail'
            variant='outlined'
            onChange={handleChange}
          />
          <TextField
            id='standard-password-input'
            label='Senha'
            name='password'
            type='password'
            variant='outlined'
            onChange={handleChange}
          />
          <Button variant='contained' color='primary' type='submit'>
            Entrar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
