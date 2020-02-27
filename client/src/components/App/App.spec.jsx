import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import App from './App';
import Picture from '../Picture/Picture';
import BreedOptions from '../BreedOptions/BreedOptions';
import BreedInfo from '../BreedInfo/BreedInfo';

const cats = [
  { id: 'test_id', url: 'test_url', breeds: [{ name: 'test breed' }] },
];
const breeds = [
  { id: 'one', name: 'Breed One' },
  { id: 'two', name: 'Breed Two' },
  { id: 'three', name: 'Breed Three' },
];
jest.mock('axios');
setAxiosMocks(axios, cats, breeds);

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<App />);
  });

  it('should render a div for the app', () => {
    expect(wrapper.find('.App-container').length).toBe(1);
  });

  it('should render a picture', () => {
    const picture = wrapper.find(Picture);
    expect(picture.length).toBe(1);
  });

  it('should give the picture a random breed from thecatapi breeds', () => {
    const picture = wrapper.find(Picture);
    const breedIDs = breeds.map((breed) => breed.id);
    const breed = picture.prop('breed');
    expect(breedIDs).toContain(breed);
  });

  it('should render BreedOptions', () => {
    const breedOptions = wrapper.find(BreedOptions);

    expect(breedOptions.length).toBe(1);
    expect(breeds).toContain(breedOptions.prop('correct'));
    expect(breeds).toContain(breedOptions.prop('incorrect1'));
    expect(breeds).toContain(breedOptions.prop('incorrect2'));
  });

  it('should BreedOptions should be given three unique breeds', () => {
    const breedOptions = wrapper.find(BreedOptions);

    const uniqueBreeds = [...new Set([
      breedOptions.prop('correct'),
      breedOptions.prop('incorrect1'),
      breedOptions.prop('incorrect2'),
    ])];

    expect(uniqueBreeds.length).toBe(3);
  });

  it('should not show options once a breed has been guessed', () => {
    wrapper.instance().answer(true);

    expect(wrapper.find(BreedOptions).length).toBe(0);
  });

  it('should render the breed info after choosing a breed', () => {
    expect(wrapper.find(BreedInfo).length).toBe(0);

    wrapper.instance().answer(true);

    const breed = wrapper.find(BreedInfo);

    expect(breeds).toContain(breed.prop('breed'));
  });

  it('should render correct if the answer is correct', () => {
    wrapper.instance().answer(true);

    const result = wrapper.find('p.result');

    expect(result.text()).toEqual('Correct');
  });

  it('shold render incorrect if the answer is incorrect', () => {
    wrapper.instance().answer(false);

    const result = wrapper.find('p.result');

    expect(result.text()).toEqual('Incorrect');
  });

  it('should render a button to load a new cat after guess', () => {
    wrapper.instance().answer(true);
    expect(wrapper.find('button.new-cat').text()).toEqual('New cat');
  });

  it('should load a new cat when button is pressed', () => {
    wrapper.instance().answer(true);
    const oldBreed = wrapper.find(Picture).prop('breed');

    wrapper.find('button.new-cat').simulate('click');

    const picture = wrapper.find(Picture);

    expect(picture.prop('breed')).not.toEqual(oldBreed);
  });

  it('should offer options again for the new cat', () => {
    wrapper.instance().answer(true);
    const oldBreed = wrapper.find(Picture).prop('breed');

    wrapper.find('button.new-cat').simulate('click');

    expect(wrapper.find(BreedInfo).length).toBe(0);
    expect(wrapper.find(BreedOptions).length).toBe(1);
  });
});
