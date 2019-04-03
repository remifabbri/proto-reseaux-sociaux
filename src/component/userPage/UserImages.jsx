import React from 'react'

const UserImages = props => {
    const images = props.images.map((currentImage, i) => {
        return (
            <img key={i} src={currentImage} className="imgUserProfil"></img>
        )
    })
    return (
        <React.Fragment>
            <section className="sectionImgsUser">
                <div className="headerImages">
                    <h2>Images</h2> 
                    <form action="submit">
                        <input type="file" onChange={props.onImageChange} />
                        <button type="submit" onClick={props.toto}>Enregister l'img</button>
                    </form>
                </div>
                <div className="allImg">
                    { images }
                </div>
            </section>
        </React.Fragment>
    )
}

export default UserImages