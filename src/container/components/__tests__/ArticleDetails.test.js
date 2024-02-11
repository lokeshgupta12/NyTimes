/* eslint-disable */

// ArticleDetails.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useListData } from '../../../utils/context';
import useNYTArticles from '../../../utils/customHooks/useNYTArticles';
import ArticleDetails from '../ArticleDetails';

// Mock useParams and useListData
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
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  test('renders article details correctly when article exists', () => {
    const mockParams = { id: '123' };
    const mockListData = [
      { id: 123, title: 'Test Article', abstract: 'Test Abstract', media: [{ 'media-metadata': [{ url: 'test-url' }] }] },
    ];

    // Mock useParams to return mockParams
    useParams.mockReturnValue(mockParams);

    // Mock useListData to return mockListData
    useListData.mockReturnValue({ listData: mockListData });

    // Render the ArticleDetails component
    const { getByText, getByAltText } = render(<ArticleDetails />);

    // Assertions for the rendered content
    expect(useParams).toHaveBeenCalled(); // Ensure useParams is called
    expect(useListData).toHaveBeenCalled(); // Ensure useListData is called
    expect(useNYTArticles).not.toHaveBeenCalled(); // Ensure useNYTArticles is not called
    expect(getByText('Test Article')).toBeInTheDocument(); // Check if the article title is rendered
    expect(getByText('Test Abstract')).toBeInTheDocument(); // Check if the article abstract is rendered
    expect(getByAltText('imgData')).toBeInTheDocument(); // Check if the image is rendered
    // Add more assertions as needed
  });

  test('renders empty div when article does not exist', () => {
    const mockParams = { id: '456' };

    // Mock useParams to return mockParams
    useParams.mockReturnValue(mockParams);

    // Mock useListData to return an empty listData
    useListData.mockReturnValue({ listData: [] });

    // Render the ArticleDetails component
    const { container } = render(<ArticleDetails />);

    // Assertions for the rendered content
    expect(useParams).toHaveBeenCalled(); // Ensure useParams is called
    expect(useListData).toHaveBeenCalled(); // Ensure useListData is called
    expect(container.firstChild).toBeEmptyDOMElement(); // Check if the component renders an empty div
  });
});
