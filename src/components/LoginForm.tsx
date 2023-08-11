//React
import React, { useState } from 'react';
//Redux
import { useDispatch } from 'react-redux';
import { changeUser } from '../slices/userSlice.tsx';
//Methods
import { getUsers } from '../methods.tsx';
//Types
import { User } from '../types.tsx';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const submitLogin = (event: React.FormEvent): void => {
    event.preventDefault();
    getUsers()
      .then((response) => {
        const currentUser: User | undefined = response.data.find(
          (user: User) => user.email === loginData.email,
        );
        if (currentUser) {
          dispatch(changeUser(currentUser));
        } else {
          //!!!Add error handling
          console.log('TODO');
        }
      })
      .catch((e) => console.log(e));
    setLoginData({ email: '', password: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target) {
      const { target } = event;
      setLoginData({ ...loginData, [target.name]: target.value });
    }
  };

  return (
    <div>
      <form onSubmit={submitLogin}>
        <span className='loginField'>
          <label htmlFor='email'>Email{'   '}</label>
          <input
            name='email'
            id='email'
            type='email'
            value={loginData.email}
            onChange={handleChange}
          />
        </span>
        <span className='loginField'>
          <label htmlFor='password'>Password{'   '}</label>
          <input
            name='password'
            id='password'
            type='password'
            value={loginData.password}
            onChange={handleChange}
          />
        </span>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default LoginForm;
