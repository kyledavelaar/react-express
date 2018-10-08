import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getFields } from './redux/fields/reducer';
// import { getLists } from './redux/lists/reducer';

import Header from './components/Header/Header';
import NotFound from './routes/NotFound/NotFound';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Gallery from './routes/Gallery/Gallery';

import s from './App.scss';

type Props = {
  user: {isAuthenticated: string},
}

type State = {
  links: string[]
}



class App extends React.PureComponent<Props, State> {
  state = {
    links: ['Home', 'Gallery'],
  }

  render() {
    const { user } = this.props;
    const { links } = this.state;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
        <Router>
          <div data-theme="light" id={s.app}>
            <Header 
              links={links}
            />
            <div id={s.main} >
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact={true} path='/' component={Home} />
                <PrivateRoute path="/gallery" component={Gallery} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }

  
  componentDidMount() {
    // this.props.getFields();
    // this.props.getLists();
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

}



///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user.user,
  }
}



export default connect(
  mapStateToProps, 
  // {getFields, getLists}
  null
)(App);

