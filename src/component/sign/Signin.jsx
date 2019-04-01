import React, { Component } from 'react'
import firebase from '../../firebase';

export class Signin extends Component {

    state = {
        email: "",
        password: "",
        error: undefined
    }

    // componentDidMount() {
    //     firebase.database().ref('users/3Fh9kfjcguaMQZ7nPgQaDzCaxvk2').on("value", snap => {
    //         console.log(snap.val())
    //     })    
    // }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);


        } catch (error) {
            this.setState({
                error: error.message,
                email: "",
                password: "",
            })
        }

    }

    render() {

        return (
            <React.Fragment>
                <h1>Réseaux sociaux</h1>
                <form action="submit">
                    <h2>Login</h2>
                    <input type="text" placeholder="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}></input>
                    <input type="password" placeholder="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}></input>
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

export default Signin
