import React from 'react';
import PropTypes from 'prop-types';

export default function BreedOptions(props) {
  const {
    correct, incorrect1, incorrect2, answer,
  } = props;

  return [
    <button type="button" onClick={() => answer(true)} key="1">{correct.name}</button>,
    <button type="button" onClick={() => answer(false)} key="2">{incorrect1.name}</button>,
    <button type="button" onClick={() => answer(false)} key="3">{incorrect2.name}</button>,
  ];
}

BreedOptions.propTypes = {
  correct: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  incorrect1: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  incorrect2: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  answer: PropTypes.func.isRequired,
};
