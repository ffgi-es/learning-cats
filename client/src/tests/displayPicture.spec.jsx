import React from 'react';
import { render, cleanup } from '@testing-library/react';
import axios from 'axios';
import setAxiosMocks from '../helpers/setAxiosMock';

import App from '../components/App/App';

jest.mock('axios');
const { imagePromise } = setAxiosMocks(axios);

describe('view picture from theCatApi', () => {
  afterEach(cleanup);

  it('shows a picture of a cat from theCatApi', async () => {
    const { getByAltText } = await render(<App />);
    imagePromise.then(() => {
      expect(getByAltText('d87')).toBeInTheDocument();
    });
  });

  it('shows the breed of the cat under the picture', async () => {
    const { getByText } = await render(<App />);
    imagePromise.then(() => {
      expect(getByText(/(Shorthair|Other|Longhaired)/)).toBeInTheDocument();
    });
  });
});
