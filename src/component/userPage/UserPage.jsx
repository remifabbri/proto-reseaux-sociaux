import React, { Component } from 'react';
import './UserPage.scss';
import firebase from '../../firebase';
import UserImages from './UserImages';
import UserRss from './UserRss'; 

class UserPage extends Component {

  state = {
    Rss: this.props.user.allrss !== undefined ? this.props.user.allrss : [], 
    Imgs: this.props.user.usersImgs !== undefined ? this.props.user.usersImgs : [],
    isLoading: false
  }

  onSubmitRss = async (e) => {
    e.preventDefault();
    let newRss = e.target.rss; 
    console.log(e.target); 
    this.setState(prevState => ({
      isLoading: false,
      Rss: [newRss, ...prevState.Rss]
    }))
    try {
      const uid = firebase.auth().currentUser.uid;
      // console.log(this.props.users.allrss); 
      // await firebase.database().ref(`users/${uid}/allrss`).set(
      //   [...this.props.user.allrss, this.state.inputRss]
      // )
      await firebase.database().ref(`users/${uid}`).update({
        allrss: [...this.state.rss, this.state.inputRss]
      })
    } catch (err) {
      console.log(err);
    }
  }

  onRssChange = (e) => {
      e => this.setState({ 
        inputRss: e.target.value 
      }
  } 

  onSubmitImg = async (e) => {
    e.preventDefault();

    var file = this.state.inputImg;

    var metadata = {
      contentType: 'image/jpeg'
    };

    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        this.setState({
          isLoading: true
        })
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState(prevState => ({
            isLoading: false,
            Imgs: [downloadURL, ...prevState.Imgs]
          }))
          console.log('File available at', downloadURL);

          const images = this.state.Imgs
          firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
            usersImgs: images
          })

        });
      });

  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        inputImg: event.target.files[0]
      })
    }
  }

  render() {
    //console.log(this.props)
    console.log("render is reloaded");

    if (this.state.isLoading)
      return <p>Loading ...</p>

    return (

      <React.Fragment>
        <main>
          <section className="bandeau" style={{ backgroundImage: `url(${this.props.user.imageBandeau})` }}>
            <div className="photoprofil" style={{ backgroundImage: `url(${this.props.user.photoProfil})` }}></div>
            <div>
              <div className="fname">{this.props.user.firstname}</div>
              <div className="lname">{this.props.user.lastname}</div>
            </div>
          </section>
          
          <UserRss rss={this.state.Rss} change={this.onRssChange} submit={this.onSubmitRss} />
          
          <section className="rssSubscribe">
          </section>
          <UserImages images={this.state.Imgs} onImageChange={this.onImageChange} toto={this.onSubmitImg}/>
          
        </main>
      </React.Fragment>
    )
  }
}

export default UserPage