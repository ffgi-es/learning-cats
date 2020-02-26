import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cat: {},
    };
  }

  componentDidMount() {
    const { breed } = this.props;
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

  render() {
    const { isLoaded, cat } = this.state;

    if (isLoaded) {
      return (
        <div className="picture-container">
          <img alt={cat.id} src={cat.url} />
          <h3 className="cat-breed">{cat.breeds[0].name}</h3>
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
