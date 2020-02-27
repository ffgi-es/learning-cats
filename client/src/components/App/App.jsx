import React, { Component } from 'react';
import axios from 'axios';
import shuffleArray from '../helpers';

import Picture from '../Picture/Picture';
import BreedOptions from '../BreedOptions/BreedOptions';
import BreedInfo from '../BreedInfo/BreedInfo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };

    const config = { headers: { 'x-api-key': process.env.REACT_APP_CAT_AÎ_KEY } };
    axios.get('https://api.thecatapi.com/v1/breeds', config)
      .then((response) => {
        this.newCat(response.data);
      });
  }

  newCat(breeds) {
    const { current } = this.state;
    const shuffled = shuffleArray(breeds);

    if (shuffled[shuffled.length - 1] === current) {
      const temp = shuffled[0];
      shuffled[0] = shuffled[shuffled.length - 1];
      shuffled[shuffled.length - 1] = temp;
    }

    const correct = shuffled.pop();
    const incorrect1 = shuffled.pop();
    const incorrect2 = shuffled.pop();

    this.setState({
      isLoaded: true,
      correct,
      incorrect1,
      incorrect2,
      answered: undefined,
      breeds,
    });
  }

  answer(correct) {
    this.setState({ answered: correct });
  }

  render() {
    const {
      isLoaded, answered,
      correct, incorrect1, incorrect2,
      breeds,
    } = this.state;

    if (isLoaded) {
      let options;
      let result;
      let info;
      if (answered !== undefined) {
        const resultText = answered ? 'Correct' : 'Incorrect';
        result = <p className="result">{resultText}</p>;
        info = <BreedInfo breed={correct} />;
      } else {
        options = (
          <BreedOptions
            correct={correct}
            incorrect1={incorrect1}
            incorrect2={incorrect2}
            answer={(ans) => this.answer(ans)}
          />
        );
      }

      return (
        <div className="App-container">
          <button type="button" className="new-cat" onClick={() => this.newCat(breeds)}>
            New cat
          </button>

          <Picture breed={correct.id} />

          {options}
          {result}
          {info}
        </div>
      );
    }
    return (<div className="App-container" />);
  }
}
