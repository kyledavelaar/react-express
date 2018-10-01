import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Socket from 'socket.io-client';

import s from './Home.scss';

class Home extends React.PureComponent {

  render() {

    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
    
  }

  componentDidMount() {
    const serverIP = 'http://localhost:8000';
    const socket = Socket(serverIP)
    socket.emit('user', 'my name is Kyle');

    socket.on('user', (res) => {
      console.log('message from user:', res)
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



}



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