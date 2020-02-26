import React from 'react';
import { render, cleanup } from '@testing-library/react';
import axios from 'axios';

import App from '../components/App/App';

jest.mock('axios');
axios.get.mockReturnValue(Promise.resolve({
  data: [
    {
      breeds: [],
      categories: [],
      id: 'd87',
      url: 'test_url',
    },
  ],
}));

describe('view picture from theCatApi', () => {
  afterEach(cleanup);

  it('shows a picture of a cat from theCatApi', async () => {
    const { getByAltText } = await render(<App />);
    expect(getByAltText('d87')).toBeInTheDocument();
  });
});
