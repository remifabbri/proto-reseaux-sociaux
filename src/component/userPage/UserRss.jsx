import React from 'react'

const UserRss = props => {

    const rss = props.rss.map((currentRss, i) => {
        return (
            <p key={i}>{currentRss}</p>
        )
    })

    return (
        <React.Fragment>
            <section className="section">
                <h2>Flux RSS</h2>
                <form action="submit">
                    <input type="text" value={props.rss} onChange={props.change} />
                    <button type="submit" onClick={props.submit}>Save RSS</button>
                </form>
                {rss}
            </section>

        </React.Fragment>
    )
}


export default UserRss