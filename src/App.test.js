/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('has the correct CSS class', () => {
    const { container } = render(<App />);
    const appElement = container.firstChild;
    expect(appElement).toHaveClass('App');
  });
});
