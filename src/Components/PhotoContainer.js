import Fot from './Fot'
import React from 'react'


//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const PhotoContainer = ({ match, data, route }) => {

    let tagPosition = 0;

    if (route) {
        for (let i = 0; i < data.length; i++) {
            //console.log(i)
            if (data[i].config.url.includes(route)) {
                tagPosition = i;
                break;
            }
        }

    } else {
        for (let i = 0; i < data.length; i++) {
            //console.log(i)
            if (data[i].config.url.includes(match.params.id)) {
                tagPosition = i;
                break;
            }
        }

    }


    let photos = data[tagPosition].data.photos.photo.map(foto =>
        <Fot key={foto.id} url={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_q.jpg`} />
    )

    return (
        <div className="photo-container">
            {(route) ? <h2>Images of:{route}</h2> : <h2>Images of:{match.params.id}</h2>}

            <ul>
                {photos}
            </ul>
        </div>
    )
}

export default PhotoContainer