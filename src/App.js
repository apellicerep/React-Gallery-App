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



//const test = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"

const urlApi2 = [`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=car&per_page=24&format=json&nojsoncallback=1`,
`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`,
`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=bike&per_page=24&format=json&nojsoncallback=1`]

export default class App extends Component {

  state = {
    initialData: [],
    loading: true,
    errorFetch: false
  }

  componentDidMount() {
    this.getFotos(urlApi2).then(data => {
      this.setState({
        initialData: data,
        loading: false

      })
    }).catch(error => {
      console.log('Error fetching and parsing data', error);
      this.setState({
        errorFetch: true
      })

    });
  }

  setLoadingTrue = () => {
    this.setState({
      loading: true
    })
  }

  setData = (newData) => {

    this.setState((prevState => {
      return {
        initialData: [...prevState.initialData.slice(0, 2), ...newData],
        loading: false
      }
    })
    )
    console.log("tres")
  }


  async getFotos(urlApi2) {
    const urls = urlApi2.map(async url => {
      const response = await axios.get(url);
      return response
    });
    const data = await Promise.all(urls);
    return data
  }


  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route render={({ history }) => <SearchForm setData={this.setData} setLoadingTrue={this.setLoadingTrue} searchApi={this.getFotos} history={history} />} />
          <Route render={() => <Nav />} />
          <Route exact path="/" render={() => <Redirect to="/car" />} />
          <React.Fragment>
            {(this.state.loading) ? <p>Loading...</p> :
              <Switch>
                {/*<Route exact path="/:id" render={({ match }) => <PhotoContainer data={this.state.initialData} match={match} />} />*/}
                <Route exact path="/car" render={({ match }) => <PhotoContainer data={this.state.initialData} route="car" />} />
                <Route exact path="/sunset" render={({ match }) => <PhotoContainer data={this.state.initialData} route="sunset" />} />
                <Route exact path="/bike" render={({ match }) => <PhotoContainer data={this.state.initialData} route="bike" />} />
                <Route exact path="/search/:id" render={({ match }) => <PhotoContainer data={this.state.initialData} match={match} />} />
                <Route component={NotFound} />
              </Switch>}
          </React.Fragment>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}