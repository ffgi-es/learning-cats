import React, { Component } from 'react';
import axios from 'axios';

import Picture from '../Picture/Picture';
import BreedInfo from '../BreedInfo/BreedInfo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      breeds: [],
    };
  }

  componentDidMount() {
    const config = { headers: { 'x-api-key': process.env.REACT_APP_CAT_AÎ_KEY } };
    axios.get('https://api.thecatapi.com/v1/breeds', config)
      .then((response) => {
        this.setState({
          isLoaded: true,
          breeds: response.data,
        });
      });
  }

  render() {
    const { isLoaded, breeds } = this.state;

    if (isLoaded) {
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      return (
        <div className="App-container">
          <Picture breed={randomBreed.id} />
          <BreedInfo breed={randomBreed} />
        </div>
      );
    }
    return (<div className="App-container" />);
  }
}
