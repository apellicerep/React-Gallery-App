import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import apiKey from './config.js'


//App Components
import SearchForm from './Components/SearchForm.js'
import Nav from './Components/Nav.js'
import PhotoContainer from './Components/PhotoContainer'
import NotFound from './Components/NotFound'


const urlApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=4&format=json&nojsoncallback=1`

//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const urlApi2 = [`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computer&per_page=4&format=json&nojsoncallback=1`,
`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cat&per_page=4&format=json&nojsoncallback=1`,
`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&per_page=4&format=json&nojsoncallback=1`]

export default class App extends Component {

  state = {
    data: [],
  }


  performSearch = (tag) => {
    const urlApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
    axios.get(urlApi)
      .then(response => {
        // console.log(response.data.photos.pages)
        this.setState({
          data: response.data.photos.photo,
          loading: true
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
          <Route render={({ history }) => <SearchForm searchApi={this.performSearch} history={history} />} />
          <Route render={() => <Nav searchApi={this.performSearch} />} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/car" />} />
            <Route exact path="/:id" render={({ match }) => <PhotoContainer loading={this.loading} searchApi={this.performSearch} data={this.state.data} match={match} />} />
            <Route exact path="/search/:id" render={({ match }) => <PhotoContainer loading={this.loading} searchApi={this.performSearch} data={this.state.data} match={match} />} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}