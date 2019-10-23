import React, { Component } from 'react'
import Fot from './Fot'


//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const PhotoContainer = ({ match, data }) => {

    let tagPosition = 0;
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        //console.log(i)
        if (data[i].config.url.includes(match.params.id)) {
            tagPosition = i;
            break;
        }
    }

    let photos = data[tagPosition].data.photos.photo.map(foto =>
        <Fot key={foto.id} url={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_q.jpg`} />
    )

    return (
        <div className="photo-container">
            <h2>Images of:{match.params.id}</h2>
            <ul>
                {photos}
            </ul>
        </div>
    )
}

export default PhotoContainer