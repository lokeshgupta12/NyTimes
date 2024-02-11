/* eslint-disable */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArticleList from '../ArticleList';
import useNYTArticles from '../../../utils/customHooks/useNYTArticles';
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));
// Mock the useNYTArticles hook
jest.mock('../../../utils/customHooks/useNYTArticles');

describe('ArticleList component', () => {
  test('renders loading state', () => {
    // Mock loading state
    useNYTArticles.mockReturnValue({ articles: [], loading: true, error: null });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    // Mock error state
    useNYTArticles.mockReturnValue({ articles: [], loading: false, error: 'Error message' });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    expect(screen.getByText('API throwing error')).toBeInTheDocument();
  });

  test('renders articles', async () => {
    // Mock articles data
    const mockArticles = [
      {
        id: 1,
        title: 'Test Article 1',
        abstract: 'This is a test abstract 1',
        media: [{ 'media-metadata': [{ url: 'image1.jpg' }] }],
      },
      {
        id: 2,
        title: 'Test Article 2',
        abstract: 'This is a test abstract 2',
        media: [{ 'media-metadata': [{ url: 'image2.jpg' }, { url: 'image2.jpg' }] }],
      },
    ];

    // Mock successful data retrieval
    useNYTArticles.mockReturnValue({ articles: mockArticles, loading: false, error: null });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    // Wait for articles to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText('This is a test abstract 1')).toBeInTheDocument();
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
      expect(screen.getByText('This is a test abstract 2')).toBeInTheDocument();
    });
  });
  test('navigates to correct URL when card is clicked', () => {
    // Mock articles data
    const mockArticles = [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1', media: [{ 'media-metadata': [{ url: 'image1.jpg' }] }] },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2', media: [{ 'media-metadata': [{ url: 'image2.jpg' }] }] },
    ];

    // Mock the useNYTArticles hook
    useNYTArticles.mockReturnValue({ articles: mockArticles, loading: false, error: null });

    // Render the component
    render(<ArticleList />);

    // Simulate click event on the first card
    fireEvent.click(document.querySelector('.MuiCard-root'));

    // Assert that useNavigate is called with the correct URL
    expect(mockedNavigate).toHaveBeenCalledWith('/articleDetails/1');
  });
});


