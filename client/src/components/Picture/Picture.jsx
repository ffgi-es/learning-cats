import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './Picture.css';

export default class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cat: {},
    };

    const { breed } = props;
    this.getImage(breed);
  }

  getImage(breed) {
    const config = {
      params: { breed_id: breed },
      headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY },
    };
    axios.get('https://api.thecatapi.com/v1/images/search', config)
      .then((response) => {
        this.setState({
          isLoaded: true,
          cat: response.data[0],
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { breed } = this.props;
    if (prevProps.breed !== breed) this.getImage(breed);
  }

  render() {
    const { isLoaded, cat } = this.state;

    if (isLoaded) {
      return (
        <div className="picture-container">
          <img className="cat-image" alt={cat.id} src={cat.url} />
        </div>
      );
    }

    return (
      <div className="picture-container">Loading...</div>
    );
  }
}

Picture.propTypes = {
  breed: PropTypes.string.isRequired,
};
