import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
    const headers = {
      withCredentials: true,
    }
    // const headers = {}

    // using proxy in package.json so don't need http://localhost:8000
    const url = 'user';
    const body = {username: 'kyle', password: 'pass1234'};

    // fetch(url, {headers})
    //   .then((res) => res.text())
    //   .then(text => console.log('text', text))
    //   .catch((err) => {console.log('USER', err)})

    axios.post(url, body, headers)
      .then(res => {
        // console.log('USER POST RES', res)
        if (res.data) {
          console.log('ALLOWED')
        } else {
          console.log('INTRUDER')
        }
      })
      .catch(err => {
        console.log('USER POST ERR', err)
      })

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