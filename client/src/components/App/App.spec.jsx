import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import App from './App';

jest.mock('axios');
axios.get.mockReturnValue(Promise.resolve({
  data: [
    {
      breeds: [],
      categories: [],
      id: 'test_id',
      url: 'test_url',
    },
  ],
}));

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<App />);
  });

  it('should render a div for the app', () => {
    expect(wrapper.find('.App-container').length).toBe(1);
  });

  it('should render an a cat image', () => {
    const catImage = wrapper.find('img');

    expect(catImage.length).toBe(1);
    expect(catImage.prop('src')).toEqual('test_url');
    expect(catImage.prop('alt')).toEqual('test_id');
  });

  it('should request the correct url from theCatApi', () => {
    expect(axios.get.mock.calls[0][0])
      .toEqual('https://api.thecatapi.com/v1/images/search');
  });

  it('should send the correct api key', () => {
    const headers = { 'x-api-key': process.env.REACT_APP_CAT_API_KEY };
    expect(axios.get.mock.calls[0][1]).toEqual({ headers });
  });
});
