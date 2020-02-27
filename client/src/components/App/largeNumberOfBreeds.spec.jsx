import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import App from './App';
import BreedOptions from '../BreedOptions/BreedOptions';
import BreedInfo from '../BreedInfo/BreedInfo';

const cats = [
  { id: 'test_id', url: 'test_url', breeds: [{ name: 'test breed' }] },
];
const breeds = [
  { id: 'one', name: 'Breed One' },
  { id: 'two', name: 'Breed Two' },
  { id: 'three', name: 'Breed Three' },
  { id: 'four', name: 'Breed Four' },
  { id: 'five', name: 'Breed Five' },
  { id: 'six', name: 'Breed Six' },
  { id: 'seve', name: 'Breed Seven' },
  { id: 'eigh', name: 'Breed Eight' },
  { id: 'nine', name: 'Breed Nine' },
  { id: 'ten', name: 'Breed Ten' },
  { id: 'elev', name: 'Breed Eleven' },
  { id: 'twel', name: 'Breed Twelve' },
  { id: 'thirt', name: 'Breed Thirteen' },
  { id: 'fourt', name: 'Breed Fourteen' },
  { id: 'fifte', name: 'Breed Fifteen' },
  { id: 'sixte', name: 'Breed Sixteen' },
  { id: 'sevet', name: 'Breed Seventeen' },
  { id: 'eighte', name: 'Breed Eighteen' },
  { id: 'ninet', name: 'Breed Nineteen' },
  { id: 'twent', name: 'Breed Twenty' },
  { id: 'twone', name: 'Breed Twenty-One' },
  { id: 'twtwo', name: 'Breed Twenty-Two' },
  { id: 'twthr', name: 'Breed Twenty-Three' },
  { id: 'twfou', name: 'Breed Twenty-Four' },
  { id: 'twfiv', name: 'Breed Twenty-Five' },
];
jest.mock('axios');
setAxiosMocks(axios, cats, breeds);

describe('<App />', () => {
  it('should keep the same breed before and after guessing', async () => {
    const wrapper = await shallow(<App />);
    const breedProps = wrapper.find(BreedOptions).props();

    const optionBreeds = [
      breedProps.correct,
      breedProps.incorrect1,
      breedProps.incorrect2,
    ];

    wrapper.instance().answer(true);

    const infoBreed = wrapper.find(BreedInfo).prop('breed');

    expect(optionBreeds).toContain(infoBreed);
  });
});
