import React from 'react';
import PropTypes from 'prop-types';

export default function BreedInfo(props) {
  const { breed } = props;

  return (<h3 className="breed-name">{breed.name}</h3>);
}

BreedInfo.propTypes = {
  breed: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};
