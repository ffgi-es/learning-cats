import React from 'react';
import { shallow } from 'enzyme';
import BreedInfo from './BreedInfo';

describe('<BreedInfo />', () => {
  let wrapper;

  const breed = { name: 'Furball', id: 'firb' };

  beforeEach(() => {
    wrapper = shallow(<BreedInfo breed={breed} />);
  });

  it('should render a heading with the breed name', () => {
    const heading = wrapper.find('h3.breed-name');

    expect(heading.length).toBe(1);
    expect(heading.text()).toEqual('Furball');
  });
});
