import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import App from './App';

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

  it('should request an image from theCatApi', () => {
    expect(axios.get.mock.calls[0][0])
      .toEqual('https://api.thecatapi.com/v1/images/search');
  });

  it('should send the correct api key', () => {
    const headers = { 'x-api-key': process.env.REACT_APP_CAT_API_KEY };
    axios.get.mock.calls.forEach((call) => {
      expect(call[1].headers).toEqual(headers);
    });
  });

  it('should render an a cat image', () => {
    const catImage = wrapper.find('img');

    expect(catImage.length).toBe(1);
    expect(catImage.prop('src')).toEqual('test_url');
    expect(catImage.prop('alt')).toEqual('test_id');
  });

  it('should show the breed of the cat', () => {
    const breed = wrapper.find('h3.cat-breed');

    expect(breed.text()).toEqual('test breed');
  });
});
