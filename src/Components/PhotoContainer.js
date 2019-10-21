import React from 'react'
import Fot from './Fot'


//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const PhotoContainer = (props) => {
    console.log(props)

    let fotos = props.data.map(foto =>
        <Fot url={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}.jpg`} />
    )

    return (
        <ul>
            {fotos}
        </ul>
    )
}

export default PhotoContainer