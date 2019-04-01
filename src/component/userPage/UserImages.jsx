import React from 'react'

const UserImages = props => {
    const images = props.images.map((currentImage, i) => {
        return (
            <img key={i} src={currentImage}></img>
        )
    })
    return (
        <React.Fragment>
            <section className="Video">
                <form action="submit">
                    <input type="file" onChange={props.onImageChange} />
                    <button type="submit" onClick={props.toto}>Enregister l'img</button>
                </form>
            </section>
            <section className="allImg">
                {images}
            </section>
        </React.Fragment>
    )
}

export default UserImages