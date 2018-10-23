// @flow

import * as React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import Socket from 'socket.io-client';

import Input from '../../components/Input/Input';

import s from './Home.scss';

type Props = {

}

type State = {
  room: string,
  message: string,
  numberOfUsers: number,
}

const token = sessionStorage.getItem('x-access-token');
const serverIP = 'http://localhost:8000';
const socket = Socket(serverIP, {query: {token}});


export class Home extends React.PureComponent<Props, State> {
  state = {
    room: '',
    message: '',
    numberOfUsers: 0, 
  }

  render() {
    const { room, message, numberOfUsers } = this.state;
    return (
      <div id={s.wrapper}>
        <h1>Home Page</h1>
        <div>
          <Input 
            label="room"
            type="text"
            value={room}
            name="room"
            placeholder="enter a room"
            checked={false}
            onChange={e => this.onInputChange(e)}
          />
          <Input 
            label="message"
            type="text"
            value={message}
            name="message"
            placeholder="enter a message"
            checked={false}
            onChange={e => this.onInputChange(e)}
          />
        </div>
        <div>
          <h3>Number Of Users: { numberOfUsers }</h3>
          <h3>Room: { room }</h3>
          <h3>Message: { message }</h3>
        </div>
      </div>
    )
    
  }

  componentDidMount() {
    let { numberOfUsers } = this.state;
    
    socket.on('user', (numberOfUsers) => {
      this.setState({
        numberOfUsers,
      })
    })
    socket.emit('user', numberOfUsers += 1);

    socket.on('message', message => {
      this.setState({
        message,
      })
    })

    socket.on('room', room => {
      this.setState({
        room,
      })
    })

    // const headers = {
    //   withCredentials: true,
    // }

    // const url = 'user';
    // const body = {username: 'kyle', password: 'pass1234'};

    // fetch(url, {headers})
    //   .then((res) => res.text())
    //   .then(text => console.log('text', text))
    //   .catch((err) => {console.log('USER', err)})

    // axios.post(url, body, headers)
    //   .then(res => {
    //     // console.log('USER POST RES', res)
    //     if (res.data) {
    //       console.log('ALLOWED')
    //     } else {
    //       console.log('INTRUDER')
    //     }
    //   })
    //   .catch(err => {
    //     console.log('USER POST ERR', err)
    //   })

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
    // this.setState({
    //   [name]: value,
    // })
    socket.emit(name, value);
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
)(Home);