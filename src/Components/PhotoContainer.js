import React, { Component } from 'react'
import Fot from './Fot'



//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const PhotoContainer = ({ searchApi, match, data, loading }) => {

    searchApi(match.params.id) //fetch api method in App.js

    let photos = data.map(foto =>
        <Fot key={foto.id} url={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}.jpg`} />
    )


    return (
        <React.Fragment>
            <h2>Images of:{match.params.id}</h2>
            <ul>
                {photos}
            </ul>

        </React.Fragment>
    )
}

export default PhotoContainer