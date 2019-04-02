import React from 'react'
import UserImgProfil from './UserImgProfil';

const UserBandeau = props => {
  return (
    <React.Fragment>
        <div className="bandeau" style={{ backgroundImage: `url(${props.imageBandeau})` }}>
            <div class="btnModif">
                <input type="file" onChange={props.changeIB}/>
            </div>
        </div>
        <div className="bandeauInfo">
            <UserImgProfil photoProfil={props.photoProfil} changeIP={props.changeIP}/>
            <div>
                <div className="fname">{props.firstName}</div>
                <div className="lname">{props.lastName}</div>
            </div>  
        </div>
    </React.Fragment>
    )
}

export default UserBandeau
