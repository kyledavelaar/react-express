import * as React from 'react';
import { connect } from 'react-redux';

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
    // const headers = {
    //   withCredentials: true,
    // }
    const headers = {}
    // using proxy in package.json so don't need
    const url = 'user';
    fetch(url, {headers})
      .then((res) => res.text())
      .then(text => console.log('text', text))
      .catch((err) => {console.log('USER', err)})
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