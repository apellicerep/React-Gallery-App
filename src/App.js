import React, { Component } from 'react';
import SearchForm from './Components/SearchForm.js'
import Nav from './Components/Nav.js'


export default class App extends Component {

  state = {

  }

  render() {
    return (
      <React.Fragment>
        <SearchForm />
        <Nav />
      </React.Fragment>

    )
  }
}
