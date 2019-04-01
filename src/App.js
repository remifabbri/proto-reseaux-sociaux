import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Signup from './component/sign/Signup';
import Signin from './component/sign/Signin';
import Home from './component/home/Home';
import UserPage from './component/userPage/UserPage';
import Nav from './component/Nav';
import firebase from './firebase';
import ReactLoading from 'react-loading';

class App extends Component {
  state = {
    loading: true,
    user: undefined,
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(async user => {
      console.log(user)
      if (user) {
        const uid = user.uid;
        const userSnapshot = await firebase.database().ref(`users/${uid}`).once('value')
        this.setState({
          user: userSnapshot.val(),
          loading: false
        })
      }
      else {
        this.setState({
          user: undefined,
          loading: false
        })
      }
    });
  }



  render() {

    return (

      <React.Fragment>
        <Nav user={this.state.user} />
        {this.state.loading ? <ReactLoading color="#3f51b5" height={'10%'} width={'10%'} type="spin"/> :
          <Router>
            <Switch>
              {!this.state.user && <Route path="/signin" component={Signin} />}
              {!this.state.user && <Route path="/signup" component={Signup} />}
              {this.state.user && <Route path="/user" render={() => <UserPage user={this.state.user} />} />}
              {this.state.user && <Route path="/home" component={Home} />}
              {!this.state.user && <Redirect from="/" to="/signin" />}
              {this.state.user && <Redirect from="/" to="/home" />}
            </Switch>
          </Router>
        }

      </React.Fragment>
    );
  }
}

export default App;
