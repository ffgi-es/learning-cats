import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axios from 'axios';
import setAxiosMocks from '../helpers/setAxiosMock';

import App from '../components/App/App';

jest.mock('axios');
const { breedsPromise } = setAxiosMocks(axios);

describe('guessing the breed from options', () => {
  afterEach(cleanup);

  it('should display three options', async () => {
    const { getByText } = await render(<App />);
    breedsPromise.then(() => {
      expect(getByText('Shorthair')).toBeInTheDocument();
      expect(getByText('Other')).toBeInTheDocument();
      expect(getByText('Longhaired')).toBeInTheDocument();
    });
  });

  it('should display a message to say if you are correct or incorrect', async () => {
    const { getByText } = await render(<App />);

    fireEvent.click(getByText('Shorthair'));

    expect(getByText(/(Correct|Incorrect)/)).toBeInTheDocument();
  });
});
