import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import App from './App';
import Picture from '../Picture/Picture';

jest.mock('axios');
setAxiosMocks(axios, 'test_id', 'test_url', 'test breed',
  [{ id: 'one', name: 'Breed One' }, { id: 'two', name: 'Breed Two' }]);

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

  it('should should give the picture a random breed from the catapi breeds', () => {
    const picture = wrapper.find(Picture);
    const breeds = ['one', 'two'];
    const breed = picture.prop('breed');
    expect(breeds).toContain(breed);
  });
});
