// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../../components/Input/Input';

import s from './Login.scss';

type Props = {

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
            onClick={() => this.onSubmit(this.state)}
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

  onSubmit(state: State) {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        errorMessage: 'You must have a username and password.'
      })
    }

    const body = {username, password};
    axios.post('/auth/login', body)
      .then(res => {
        console.log('login', res)
        if (res.data.auth) {
          const token = res.data.token;
          sessionStorage.setItem('x-access-token', token);
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


// function mapStateToProps(state) {
//   // console.log('state', state.form.ProgramForm)
//   return {
//     account: state.account.data
//   }
// }


export default connect(
  null,
  null,
)(Login);