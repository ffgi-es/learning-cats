import React from 'react';
import { shallow, mount } from 'enzyme';

import BreedOptions from './BreedOptions';

describe('<BreedOptions />', () => {
  let wrapper;

  const correctBreed = { name: 'Correct Breed', id: 'corr' };
  const incorrect1 = { name: 'Incorrect Breed', id: 'inco' };
  const incorrect2 = { name: 'Wrong Breed', id: 'wron' };

  const breedNames = ['Correct Breed', 'Incorrect Breed', 'Wrong Breed'];

  const answerMock = jest.fn();

  beforeEach(() => {
    answerMock.mockClear();
    wrapper = shallow(
      <BreedOptions
        correct={correctBreed}
        incorrect1={incorrect1}
        incorrect2={incorrect2}
        answer={answerMock}
      />,
    );
  });

  it('should render the three options as buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(3);

    const button1 = buttons.at(0).text();
    const button2 = buttons.at(1).text();
    const button3 = buttons.at(2).text();
    const buttonsUnique = [...new Set([button1, button2, button3])];

    expect(breedNames).toContain(button1);
    expect(breedNames).toContain(button2);
    expect(breedNames).toContain(button3);
    expect(buttonsUnique.length).toBe(3);
  });

  it('should call the callback with true if correct option is clicked', () => {
    wrapper = mount(
      <BreedOptions
        correct={correctBreed}
        incorrect1={incorrect1}
        incorrect2={incorrect2}
        answer={answerMock}
      />,
    );
    wrapper.find('button').forEach((ele) => {
      if (ele.text() === correctBreed.name) ele.simulate('click');
    });

    expect(answerMock.mock.calls.length).toBe(1);
    expect(answerMock.mock.calls[0][0]).toBe(true);
  });

  it('should call the callback with false if incorrect1 option is clicked',
    () => {
      wrapper = mount(
        <BreedOptions
          correct={correctBreed}
          incorrect1={incorrect1}
          incorrect2={incorrect2}
          answer={answerMock}
        />,
      );
      wrapper.find('button').forEach((ele) => {
        if (ele.text() === incorrect1.name) ele.simulate('click');
      });

      expect(answerMock.mock.calls.length).toBe(1);
      expect(answerMock.mock.calls[0][0]).toBe(false);
    });

  it('should call the callback with false if incorrect2 option is clicked',
    () => {
      wrapper = mount(
        <BreedOptions
          correct={correctBreed}
          incorrect1={incorrect1}
          incorrect2={incorrect2}
          answer={answerMock}
        />,
      );
      wrapper.find('button').forEach((ele) => {
        if (ele.text() === incorrect2.name) ele.simulate('click');
      });

      expect(answerMock.mock.calls.length).toBe(1);
      expect(answerMock.mock.calls[0][0]).toBe(false);
    });
});
