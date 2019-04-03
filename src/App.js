import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Signup from './component/sign/Signup';
import Signin from './component/sign/Signin';
import Home from './component/home/Home';
import UserPage from './component/userPage/UserPage';
import OtherUser from './component/otherUser/OtherUser'; 
import Nav from './component/Nav';
import firebase from './firebase';
import ReactLoading from 'react-loading';


class App extends Component {
  state = {
    loading: true,
    user: undefined,
    search: "",
    allUsers: undefined,
    resultSearch: []
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

        const users = await firebase.database().ref('users').once('value')
        let allUsers = []
        users.forEach(user => {
          allUsers = [
            ...allUsers, 
            {
              id: user.key, 
              ...user.val()
            }
          ]
        })
        this.setState({
          allUsers
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

  onNavSearch = async (e) => {
    this.setState({
      search: e.target.value
    })
    if(this.state.search.length > 1){
      const snapshot = await firebase.database().ref('users').once('value')
      snapshot.forEach(user => {  
        if(user.val().firstname.indexOf(this.state.search) !== -1) {
          /* console.log(user.key, user.val()) */
          this.setState({
            resultSearch : user.val(),
          })
        }
        else console.log("pas trouvé")
      })
    }
  }



  render() {

    return (

      <React.Fragment>
        <Nav user={this.state.user} change={this.onNavSearch} result={this.state.resultSearch} allUsers={this.state.allUsers} />
        {/* <UserAutoSuggest allUsers={this.state.allUsers}/> */}
        {this.state.loading ? <ReactLoading color="#3f51b5" height={'10%'} width={'10%'} type="spin"/> :
          <Router>
            <Switch>
              {!this.state.user && <Route path="/signin" component={Signin} />}
              {!this.state.user && <Route path="/signup" component={Signup} />}
              {this.state.user &&  <Route path="/user/:id" component={OtherUser} />} 
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
