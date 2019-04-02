import React from 'react'

const UserImgProfil = props => {
  return (
    <div className="photoprofil" style={{ backgroundImage: `url(${props.photoProfil})` }}>
     <input type="file" onChange={props.changeIP}/>
    </div>
  )
}


export default UserImgProfil