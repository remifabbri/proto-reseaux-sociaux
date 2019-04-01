import React, { Component } from 'react'
import firebase from '../../firebase';

export class Signup extends Component {

    state = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        error: undefined
    }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            const value = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            const uid = value.user.uid

            await firebase.database().ref(`users/${uid}`).set({
                firstname: this.state.firstname,
                lastname: this.state.lastname
            })
            
            this.setState({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                error: undefined
            })
        } catch (error) {
            this.setState({
                error: error.message
            })
        }

    }

    render() {

        return (
            <React.Fragment>
                <h1>Réseaux sociaux</h1>
                <form action="submit">
                    <h2>Inscription</h2>
                    <input type="text" placeholder="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}></input>
                    <input type="password" placeholder="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}></input>
                    <input type="text" placeholder="firstname" value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })}></input>
                    <input type="text" placeholder="lastname" value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })}></input>
                    <button type="submit" onClick={e => this.onSubmit(e)}>submit</button>
                </form>
                {
                    this.state.error !== undefined &&
                    <p style={{ color: 'red' }}>{this.state.error}</p>
                }
            </React.Fragment>
        );
    }
}

export default Signup
