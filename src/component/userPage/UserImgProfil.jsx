import React from 'react'

const UserImgProfil = props => {
  return (
    <div className="photoprofil" style={{ backgroundImage: `url(${props.photoProfil})` }}>
     <input type="file" onChange={props.change}/>
    </div>
  )
}


export default UserImgProfil