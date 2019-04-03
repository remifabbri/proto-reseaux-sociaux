import React, { Component } from 'react'
import firebase from '../../firebase';

export class OtherUser extends Component {

  componentWillMount(){

    firebase.database().ref(`/users/${this.props.match.params.id}`).on('value', snapshot => {
      console.log(snapshot.val());
      this.props = snapshot.val(); 

        
    }); 
  }


  render() {
    return (
      <React.Fragment>
        <main>

          <div className="bandeau" style={{ backgroundImage: `url(${this.props.imageBandeau})` }}>
              <div className="btnModif">
                  <input type="file" onChange={this.props.changeIB}/>
              </div>
          </div>

          <div className="bandeauInfo">
              <section className="sectionImgsUser">
                <div className="allImg">
                {/*  { images } */}
                </div>
              </section>
              <div>
                  <div className="fname">{this.props.firstName}</div>
                  <div className="lname">{this.props.lastName}</div>
              </div>  
          </div>
          
          <section className="sectionRss">
            <div>
               {/*  { rss } */}
            </div>
          </section>

          <section className="rssSubscribe">
          </section>

          <section className="sectionImgsUser">
            <div className="allImg">
               {/*  { images } */}
            </div>
          </section>
        </main>
      </React.Fragment>
    )
  }
}

export default OtherUser
