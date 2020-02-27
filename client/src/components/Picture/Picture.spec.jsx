import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import setAxiosMocks from '../../helpers/setAxiosMock';

import Picture from './Picture';

const cats = [
  { id: 'test_id', url: 'test_url', breeds: [{ name: 'test breed' }] },
];
jest.mock('axios');
setAxiosMocks(axios, cats);

describe('<Picture />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Picture breed="test_breed_id" />);
  });

  it('should render a div for the app', () => {
    expect(wrapper.find('.picture-container').length).toBe(1);
  });

  it('should request an image from theCatApi', () => {
    expect(axios.get.mock.calls[0][0])
      .toEqual('https://api.thecatapi.com/v1/images/search');
  });

  it('should request an image of a cat of the selected breed', () => {
    expect(axios.get.mock.calls[0][1].params.breed_id)
      .toEqual('test_breed_id');
  });

  it('should send the correct api key', () => {
    const headers = { 'x-api-key': process.env.REACT_APP_CAT_API_KEY };
    axios.get.mock.calls.forEach((call) => {
      expect(call[1].headers).toEqual(headers);
    });
  });

  it('should render an a cat image', () => {
    const catImage = wrapper.find('img.cat-image');

    expect(catImage.length).toBe(1);
    expect(catImage.prop('src')).toEqual('test_url');
    expect(catImage.prop('alt')).toEqual('test_id');
  });
});
