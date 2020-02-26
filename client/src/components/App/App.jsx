import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cat: {},
    };
  }

  componentDidMount() {
    const config = { headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY } };
    axios.get('https://api.thecatapi.com/v1/images/search', config)
      .then((response) => {
        this.setState({
          isLoaded: true,
          cat: response.data[0],
        });
      });
  }

  render() {
    const { isLoaded, cat } = this.state;

    let content;
    if (isLoaded) {
      content = (
        <div>
          <img alt={cat.id} src={cat.url} />
          <h3 className="cat-breed">{cat.breeds[0].name}</h3>
        </div>
      );
    } else content = <p>Loading...</p>;

    return (
      <div className="App-container">
        {content}
      </div>
    );
  }
}
