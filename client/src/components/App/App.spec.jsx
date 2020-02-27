import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import App from './App';
import Picture from '../Picture/Picture';
import BreedInfo from '../BreedInfo/BreedInfo';

jest.mock('axios');
const breeds = [{ id: 'one', name: 'Breed One' }, { id: 'two', name: 'Breed Two' }];
setAxiosMocks(axios, 'test_id', 'test_url', 'test breed', breeds);

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

  it('should render a the breed info', () => {
    const breed = wrapper.find(BreedInfo);

    expect(breeds).toContain(breed.prop('breed'));
  });
});
