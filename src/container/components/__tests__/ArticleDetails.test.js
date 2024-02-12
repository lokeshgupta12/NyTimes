/* eslint-disable */

import React from 'react';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useListData } from '../../../utils/context';
import useNYTArticles from '../../../utils/customHooks/useNYTArticles';
import ArticleDetails from '../ArticleDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
jest.mock('../../../utils/context', () => ({
  useListData: jest.fn(),
}));
jest.mock('../../../utils/customHooks/useNYTArticles');

describe('ArticleDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders article details correctly when article exists', () => {
    const mockParams = { id: '123' };
    const mockListData = [
      { id: 123, title: 'Test Article', abstract: 'Test Abstract', media: [{ 'media-metadata': [{ url: 'test-url' }] }] },
    ];

    useParams.mockReturnValue(mockParams);

  
    useListData.mockReturnValue({ listData: mockListData });


    const { getByText, getByAltText } = render(<ArticleDetails />);

    expect(useParams).toHaveBeenCalled();
    expect(useListData).toHaveBeenCalled();
    expect(useNYTArticles).not.toHaveBeenCalled();
    expect(getByText('Test Article')).toBeInTheDocument();
    expect(getByText('Test Abstract')).toBeInTheDocument();
    expect(getByAltText('imgData')).toBeInTheDocument();
  });

  test('renders empty div when article does not exist', () => {
    const mockParams = { id: '456' };

    useParams.mockReturnValue(mockParams);

    useListData.mockReturnValue({ listData: [] });
    const { container } = render(<ArticleDetails />);

    expect(useParams).toHaveBeenCalled();
    expect(useListData).toHaveBeenCalled();
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
