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