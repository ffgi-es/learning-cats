import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axios from 'axios';
import setAxiosMocks from '../helpers/setAxiosMock';

import App from '../components/App/App';

const cats = [
  { id: 'one', url: 'test_url_one', breeds: [{ name: 'Manx' }] },
];
jest.mock('axios');
const { imagePromise, breedsPromise } = setAxiosMocks(axios, cats);

describe('clicking a button for a new cat', () => {
  afterEach(cleanup);

  it('a button after guessing loads a new cat', async () => {
    const { getByText, getByAltText } = await render(<App />);

    imagePromise.then(() => {
      expect(getByAltText('one')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Shorthair'));

    const cats2 = [
      { id: 'two', url: 'test_url_two', breeds: [{ name: 'New' }] },
    ];
    setAxiosMocks(axios, cats2);

    await fireEvent.click(getByText('New cat'));

    imagePromise.then(() => {
      expect(getByAltText('two')).toBeInTheDocument();
    });
  });
});
