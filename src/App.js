import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getFields } from './redux/fields/reducer';
// import { getLists } from './redux/lists/reducer';

import Header from './components/Header/Header';
import NotFound from './routes/NotFound/NotFound';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Gallery from './routes/Gallery/Gallery';

import s from './App.scss';


class App extends React.PureComponent {
  render() {
    return (
        <Router>
          <div data-theme="light" id={s.app}>
            <Header 
              links={['Home', 'Gallery']}
            />
            <div id={s.main} >
              <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/Login" component={Login} />
                <Route path="/Gallery" component={Gallery} />
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


}




export default connect(
  null, 
  // {getFields, getLists}
  null
)(App);

