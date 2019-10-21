import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import apiKey from './config.js'


//App Components
import SearchForm from './Components/SearchForm.js'
import Nav from './Components/Nav.js'
import PhotoContainer from './Components/PhotoContainer'


const urlApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=4&format=json&nojsoncallback=1`

//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

export default class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = () => {
    axios.get(urlApi)
      .then(response => {
        //console.log(response.data.photos.photo)
        this.setState({
          data: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SearchForm />
          <Nav />
          <PhotoContainer data={this.state.data} />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
