// @flow

import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../redux/user/reducer';
import Input from '../../components/Input/Input';

import s from './Login.scss';

type Props = {
  updateUser: ({isAuthenticated: boolean}) => void,
  user: {isAuthenticated: string},
}

type State = {
  username: string,
  password: string,
  errorMessage: string,
}



export class Login extends React.PureComponent<Props, State> {
  state = {
    username: '',
    password: '',
    errorMessage: '', 
  }

  render() {
    const { username, password, errorMessage } = this.state;
    const { user } = this.props;

    return (
      <div id={s.wrapper}>
        <h1>Login Page</h1>
        <div>
          <Input 
            label="Username"
            type="text"
            value={username}
            name="username"
            placeholder="username"
            checked={false}
            onChange={e => this.onInputChange(e)}
          />
          <Input 
            label="Password"
            type="password"
            value={password}
            name="password"
            placeholder="password"
            checked={false}
            onChange={e => this.onInputChange(e)}
          />
          <button 
            onClick={() => this.onSubmit()}
          >
            Submit
          </button>
        </div>
        {
          errorMessage !== '' &&
          <div>
            <h3>{errorMessage}</h3>
          </div>
        }
        {
          user.isAuthenticated && 
          <Redirect to='/' />
        }
      </div>
    )
    
  }

  


  ///////////////////////////////////////////////////////////////////////
  //  RENDER METHODS
  ///////////////////////////////////////////////////////////////////////
  
  
  ///////////////////////////////////////////////////////////////////////
  //  UTIL METHODS
  ///////////////////////////////////////////////////////////////////////
  
  
  ///////////////////////////////////////////////////////////////////////
  //  EVENT HANDLERS
  ///////////////////////////////////////////////////////////////////////

  onInputChange(e: SyntheticEvent<any>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({
      [name]: value,
    })
  }

  onSubmit() {
    const { username, password } = this.state;
    const { updateUser } = this.props;

    if (username === '' || password === '') {
      this.setState({
        errorMessage: 'You must have a username and password.'
      })
    }

    const body = {username, password};
    axios.post('/auth/login', body)
      .then(res => {
        if (res.data.auth) {
          // console.log('login', res)
          const token = res.data.token;
          sessionStorage.setItem('x-access-token', token);
          updateUser({isAuthenticated: true});
        }
      })
      .catch(err => {
        console.log('login err', err);
      })
  }



}






///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////


function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user.user
  }
}


export default connect(
  mapStateToProps,
  {updateUser},
)(Login);