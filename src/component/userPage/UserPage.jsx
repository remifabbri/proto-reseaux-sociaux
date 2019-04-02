import React, { Component } from 'react';
import './UserPage.scss';
import firebase from '../../firebase';
import UserImages from './UserImages';
import UserRss from './UserRss'; 
import UserBandeau from './UserBandeau'; 

class UserPage extends Component {

  state = {
    Rss: this.props.user.allrss !== undefined ? this.props.user.allrss : [], 
    Imgs: this.props.user.usersImgs !== undefined ? this.props.user.usersImgs : [],
    imageProfil : this.props.user.imageProfil !== undefined ? this.props.user.imageProfil : "" ,
    imageBandeau: this.props.user.imageBandeau!== undefined ? this.props.user.imageBandeau: "" ,
    isLoading: false,
    inputRss : ""
  }

  onImgBandeauChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      this.setState({
        imageBandeau: file
      })
    
    
    var metadata = {
      contentType: 'image/jpeg'
    };

    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('imagesBandeau/' + file.name).put(file, metadata);

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
            imageBandeau: downloadURL
          }))
          console.log('File available at', downloadURL);

          firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
            imageBandeau: downloadURL
          })

        });
      })
  }}

  onImgProfilChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      this.setState({
        imageProfil: file
      })
    
    
    var metadata = {
      contentType: 'image/jpeg'
    };

    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('imagesProfil/' + file.name).put(file, metadata);

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
            imageProfil: downloadURL
          }))
          console.log('File available at', downloadURL);

          firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
            imageProfil: downloadURL
          })

        });
      })
  }}

  onSubmitRss = async (e) => {
    e.preventDefault();
    const Rss = [this.state.inputRss, ...this.state.Rss]
    this.setState({
      isLoading: true,
      Rss, 
      inputRss: ""
    })
    try {
      const uid = firebase.auth().currentUser.uid;
      await firebase.database().ref(`users/${uid}`).update({
        allrss:  Rss
      })
      this.setState({ isLoading: false })
    } catch (err) {
      console.log(err);
    }
  }

  onRssChange = (e) => {
      this.setState({ 
        inputRss: e.target.value 
      })
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
          <UserBandeau imageBandeau={this.state.imageBandeau} changeIB={this.onImgBandeauChange} photoProfil={this.state.imageProfil} changeIP={this.onImgProfilChange} firstName={this.props.user.firstname} lastName={this.props.user.lastname}/>
          
          <UserRss rss={this.state.Rss} value={this.state.inputRss} change={this.onRssChange} submit={this.onSubmitRss} />
          
          <section className="rssSubscribe">
          </section>
          <UserImages images={this.state.Imgs} onImageChange={this.onImageChange} toto={this.onSubmitImg}/>
          
        </main>
      </React.Fragment>
    )
  }
}

export default UserPage