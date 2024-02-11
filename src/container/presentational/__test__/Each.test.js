/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import Each from '../Each';

describe('Each Component', () => {
  test('renders each item using render function', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    const renderFunction = jest.fn((item, index) => (
      <div key={index}>{`${item.id}: ${item.name}`}</div>
    ));
    render(<Each items={items} render={renderFunction} />);
    items.forEach((item, index) => {
      expect(renderFunction).toHaveBeenCalledWith(item, index);
    });
  });

  test('renders nothing if items array is empty', () => {
    const renderFunction = jest.fn();
    render(<Each items={[]} render={renderFunction} />);
    expect(renderFunction).not.toHaveBeenCalled();
  });

  test('renders nothing if items array is null or undefined', () => {
    const renderFunction = jest.fn();
    render(<Each items={null} render={renderFunction} />);
    expect(renderFunction).not.toHaveBeenCalled();
  });
});
