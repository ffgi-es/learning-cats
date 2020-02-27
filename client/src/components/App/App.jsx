import React, { Component } from 'react';
import axios from 'axios';
import shuffleArray from './helpers';

import Picture from '../Picture/Picture';
import BreedOptions from '../BreedOptions/BreedOptions';
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

  answer(correct) {
    this.setState({ answered: correct });
  }

  render() {
    const { isLoaded, breeds, answered } = this.state;

    if (isLoaded) {
      const shuffled = shuffleArray(breeds);

      const randomBreed = shuffled.pop();
      const incorrect1 = shuffled.pop();
      const incorrect2 = shuffled.pop();

      let options;
      let result;
      let info;
      if (answered !== undefined) {
        const resultText = answered ? 'Correct' : 'Incorrect';
        result = <p className="result">{resultText}</p>;
        info = <BreedInfo breed={randomBreed} />;
      } else {
        options = (
          <BreedOptions
            correct={randomBreed}
            incorrect1={incorrect1}
            incorrect2={incorrect2}
            answer={(ans) => this.answer(ans)}
          />
        );
      }

      return (
        <div className="App-container">
          <Picture breed={randomBreed.id} />
          {options}
          {result}
          {info}
        </div>
      );
    }
    return (<div className="App-container" />);
  }
}
